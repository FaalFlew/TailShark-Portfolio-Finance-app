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
        public static IQueryable<T> ApplyPagination<T>(this IQueryable<T> query, int page, int pageSize)
        {
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 10;

            return query.Skip((page - 1) * pageSize).Take(pageSize);
        }
    }
}
