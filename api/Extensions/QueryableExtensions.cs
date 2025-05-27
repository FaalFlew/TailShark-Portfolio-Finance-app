using System.Collections;
using System.Linq;
using System.Linq.Expressions;

namespace api.Extensions
{
    public static class QueryableExtensions
    {

        public static IQueryable<T> OrderByPropertyName<T>(
            this IQueryable<T> source,
            string propertyName,
            bool descending = false)
            => ApplyOrdering(source, propertyName, descending, useThenBy: false);

        public static IQueryable<T> ThenByPropertyName<T>(
            this IQueryable<T> source,
            string propertyName,
            bool descending = false)
            => ApplyOrdering(source, propertyName, descending, useThenBy: true);
        public static IQueryable<T> ApplySorting<T>(
            this IQueryable<T> source,
            IEnumerable<(string PropertyName, bool Descending)> sortingCriteria)
        {
            if (sortingCriteria == null || !sortingCriteria.Any())
                return source;

            var firstCriterion = sortingCriteria.First();
            var query = source.OrderByPropertyName(firstCriterion.PropertyName, firstCriterion.Descending);

            foreach (var criterion in sortingCriteria.Skip(1))
            {
                query = query.ThenByPropertyName(criterion.PropertyName, criterion.Descending);
            }

            return query;
        }

        private static IQueryable<T> ApplyOrdering<T>(
            IQueryable<T> source,
            string propertyName,
            bool descending,
            bool useThenBy)
        {
            if (string.IsNullOrWhiteSpace(propertyName))
                return source;

            var parameter = Expression.Parameter(typeof(T), "x");
            Expression propertyAccess = parameter;

            foreach (var prop in propertyName.Split('.'))
                propertyAccess = Expression.PropertyOrField(propertyAccess, prop);

            var lambda = Expression.Lambda(propertyAccess, parameter);
            var methodName = useThenBy
                ? (descending ? "ThenByDescending" : "ThenBy")
                : (descending ? "OrderByDescending" : "OrderBy");

            var result = Expression.Call(
                typeof(Queryable),
                methodName,
                new[] { typeof(T), propertyAccess.Type },
                source.Expression,
                Expression.Quote(lambda)
            );

            return source.Provider.CreateQuery<T>(result);
        }


        private const int DefaultPageSize = 10;

        public static IQueryable<T> ApplyPagination<T>(this IQueryable<T> query, int page, int pageSize)
        {
            if (page < 1) page = DefaultPageSize;
            if (pageSize < 1) pageSize = 10;

            return query.Skip((page - 1) * pageSize).Take(pageSize);
        }


        public static IQueryable<T> WhereEquals<T>(this IQueryable<T> source, string propertyName, object value)
        {
            if (value == null || string.IsNullOrWhiteSpace(propertyName))
                return source;

            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.PropertyOrField(parameter, propertyName);
            var constant = Expression.Constant(value);
            var equality = Expression.Equal(property, constant);
            var lambda = Expression.Lambda<Func<T, bool>>(equality, parameter);

            return source.Where(lambda);
        }

        public static IQueryable<T> WhereContains<T>(this IQueryable<T> source, string propertyName, string value)
        {
            if (string.IsNullOrWhiteSpace(value) || string.IsNullOrWhiteSpace(propertyName))
                return source;

            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.PropertyOrField(parameter, propertyName);
            var method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
            var constant = Expression.Constant(value);
            var contains = Expression.Call(property, method, constant);
            var lambda = Expression.Lambda<Func<T, bool>>(contains, parameter);

            return source.Where(lambda);
        }

        public static IQueryable<T> WhereGreaterThan<T>(this IQueryable<T> source, string propertyName, object value)
        {
            if (value == null || string.IsNullOrWhiteSpace(propertyName))
                return source;

            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.PropertyOrField(parameter, propertyName);
            var constant = Expression.Constant(value);
            var greaterThan = Expression.GreaterThan(property, constant);
            var lambda = Expression.Lambda<Func<T, bool>>(greaterThan, parameter);

            return source.Where(lambda);
        }

        public static IQueryable<T> WhereLessThan<T>(this IQueryable<T> source, string propertyName, object value)
        {
            if (value == null || string.IsNullOrWhiteSpace(propertyName))
                return source;

            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.PropertyOrField(parameter, propertyName);
            var constant = Expression.Constant(value);
            var lessThan = Expression.LessThan(property, constant);
            var lambda = Expression.Lambda<Func<T, bool>>(lessThan, parameter);

            return source.Where(lambda);
        }

        public static IQueryable<T> WhereBetween<T>(this IQueryable<T> source, string propertyName, object min, object max)
        {
            if (min == null || max == null || string.IsNullOrWhiteSpace(propertyName))
                return source;

            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.PropertyOrField(parameter, propertyName);
            var minConstant = Expression.Constant(min);
            var maxConstant = Expression.Constant(max);
            var greaterThanOrEqual = Expression.GreaterThanOrEqual(property, minConstant);
            var lessThanOrEqual = Expression.LessThanOrEqual(property, maxConstant);
            var between = Expression.AndAlso(greaterThanOrEqual, lessThanOrEqual);
            var lambda = Expression.Lambda<Func<T, bool>>(between, parameter);

            return source.Where(lambda);
        }

        public static IQueryable<T> WhereIf<T>(
            this IQueryable<T> source,
            bool condition,
            Expression<Func<T, bool>> predicate)
        {
            if (condition)
            {
                return source.Where(predicate);
            }
            return source;
        }

        public static IQueryable<T> WhereIfEquals<T>(
            this IQueryable<T> source,
            bool condition,
            string propertyName,
            object value)
        {
            if (condition)
            {
                return source.WhereEquals(propertyName, value);
            }
            return source;
        }

        private static Expression GetPropertyAccessExpression(Expression parameter, string propertyName)
        {
            Expression propertyAccess = parameter;
            foreach (var propNamePart in propertyName.Split('.'))
            {

                if (typeof(IEnumerable).IsAssignableFrom(propertyAccess.Type) &&
                    propertyAccess.Type != typeof(string) &&
                    propertyAccess.Type.IsGenericType)
                {

                }
                propertyAccess = Expression.PropertyOrField(propertyAccess, propNamePart);
            }
            return propertyAccess;
        }

        private static IQueryable<T> BuildWhereExpression<T>(
            this IQueryable<T> source,
            string propertyName,
            object? value,
            Func<Expression, Expression, Expression> comparisonFunc)
        {
            if (string.IsNullOrWhiteSpace(propertyName))
                return source;

            var parameter = Expression.Parameter(typeof(T), "x");
            Expression propertyAccess;
            try
            {
                propertyAccess = GetPropertyAccessExpression(parameter, propertyName);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Warning: Property '{propertyName}' not found for filtering. {ex.Message}");
                return source;
            }

            if (value == null && !(comparisonFunc == Expression.Equal || comparisonFunc == Expression.NotEqual))
                return source;


            Expression constantExpression;
            if (value != null)
            {
                object? convertedValue;
                Type propertyType = Nullable.GetUnderlyingType(propertyAccess.Type) ?? propertyAccess.Type;

                try
                {
                    if (propertyType.IsEnum && value is string stringValue)
                    {
                        convertedValue = Enum.Parse(propertyType, stringValue, ignoreCase: true);
                    }
                    else
                    {
                        convertedValue = Convert.ChangeType(value, propertyType);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Warning: Could not convert value '{value}' to type '{propertyType.Name}' for property '{propertyName}'. {ex.Message}");
                    return source;
                }
                constantExpression = Expression.Constant(convertedValue, propertyAccess.Type);
            }
            else
            {
                constantExpression = Expression.Constant(null, propertyAccess.Type);
            }


            Expression comparison;
            try
            {
                comparison = comparisonFunc(propertyAccess, constantExpression);
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine($"Warning: Cannot apply comparison for property '{propertyName}' with value '{value}'. {ex.Message}");
                return source;
            }

            var lambda = Expression.Lambda<Func<T, bool>>(comparison, parameter);
            return source.Where(lambda);
        }
        public static IQueryable<T> WhereIsNull<T>(this IQueryable<T> source, string propertyName)
            => BuildWhereExpression(source, propertyName, null, Expression.Equal);

        public static IQueryable<T> WhereIsNotNull<T>(this IQueryable<T> source, string propertyName)
            => BuildWhereExpression(source, propertyName, null, Expression.NotEqual);


    }
}
