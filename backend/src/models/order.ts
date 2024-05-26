interface Order {
    id: number;
    userId: number;
    productIds: number[];
    total: number;
    status: string;
  }
  
  export default Order;
  