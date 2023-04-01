export interface DashboardResponse {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productWithNoInventory: number;
  lowInvetory: number;
}
