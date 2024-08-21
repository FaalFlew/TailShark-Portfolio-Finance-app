const dbName = "FinancialDataDB";
const dbVersion = 1;

const balanceSheetStore: string = "balanceSheets";
const cashFlowStore: string = "cashFlows";
const incomeStatementStore: string = "incomeStatements";
const companyKeyMetricStore: string = "companyKeyMetrics";
const companyProfileStore: string = "companyProfile";
const companyTenKStore: string = "companyTenKStore";
const companySearchStore: string = "companySearchStore";


let db: IDBDatabase | null = null;


const openDatabase = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      db = (event.target as IDBOpenDBRequest).result;

      db.createObjectStore(balanceSheetStore, { keyPath: "symbol" });
      db.createObjectStore(cashFlowStore, { keyPath: "symbol" });
      db.createObjectStore(incomeStatementStore, { keyPath: "symbol" });
      db.createObjectStore(companyKeyMetricStore, { keyPath: "symbol" });
      db.createObjectStore(companyProfileStore, { keyPath: "symbol" });
      db.createObjectStore(companyTenKStore, { keyPath: "symbol" });
      db.createObjectStore(companySearchStore, { keyPath: "symbol" });
    };

    request.onsuccess = (event: Event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onerror = (event: Event) => {
      reject("Database error: " + (event.target as IDBRequest).error);
    };
  });
};

const saveData = async (storeName: string, key: string, data: any): Promise<void> => {
  if (!db) {
    await openDatabase();
  }

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    const record = Array.isArray(data) ? data : data;

    const request = store.put({ symbol: key, data: record });
    request.onsuccess = () => resolve();
    request.onerror = (event: Event) =>
      reject("Error saving data: " + (event.target as IDBRequest).error);
  });
};

const fetchData = async <T>(storeName: string, key: string): Promise<T | undefined> => {
  if (!db) {
    await openDatabase();
  }

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    const request = store.get(key);

    request.onsuccess = (event: Event) => {
      const result = (event.target as IDBRequest).result;
      if (result) {
        resolve(result.data); 
      } else {
        resolve(undefined);
      }
    };

    request.onerror = (event: Event) =>
      reject("Error fetching data: " + (event.target as IDBRequest).error);
  });
};


export {
  openDatabase,
  saveData,
  fetchData,
  balanceSheetStore,
  cashFlowStore,
  incomeStatementStore,
  companyKeyMetricStore,
  companyProfileStore,
  companyTenKStore,
  companySearchStore,
};
