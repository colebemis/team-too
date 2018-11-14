export const statuses = {
  RECEIVED: "RECEIVED",
  PROCESSING: "PROCESSING",
  READY_TO_SHIP: "READY_TO_SHIP",
  READY_FOR_PICK_UP: "READY_FOR_PICK_UP",
  COMPLETE: "COMPLETE",
  CANCELLED: "CANCELLED",
};

export const statusDisplayNames = {
  [statuses.RECEIVED]: "Received",
  [statuses.PROCESSING]: "Processing",
  [statuses.READY_TO_SHIP] : "Ready To Ship",
  [statuses.READY_FOR_PICK_UP] : "Ready For Pick-Up",
  [statuses.COMPLETE] : "Complete",
  [statuses.CANCELLED] : "Cancelled"
}