export class Database {
    connect() {
      return 'Connected';
    }
  
    disconnect(){
      return 'Disconnected';
    }
  }
  
// export class Database {
//     // Asynchronous method that returns a promise
//     async connect(): Promise<string> {
//       return 'Connected';
//     }
  
//     // Synchronous method
//     disconnect(): string {
//       return 'Disconnected';
//     }
//   }