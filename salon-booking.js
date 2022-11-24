export default function salonBooking(db) {
  async function findAllTreatments() {
    const treatment = await db.manyOrNone(
      `select * from treatment order by treatment_name asc`
    );
    return treatment;
  }
  async function findStylist(phoneNumber) {
    const stylist = await db.manyOrNone(
      ` select * from stylist where phone_number = $1`,
      [phoneNumber]
    );
    return stylist;
  }

  async function findClient(phoneNumber) {
    const client = await db.manyOrNone(
      `select * from client where phone_number = $1`,
      [phoneNumber]
    );
    return client;
  }

  async function makeBooking(clientId, treatmentId, stylistID, date, time) {
    await db.manyOrNone(
      `insert into booking (client_id, treatment_id, stylist_id, booking_date, booking_time) values ($1, $2, $3, $4)`,
      [clientId, treatmentId, stylistID, date, time]
    );
  }

  async function findTreatment(phoneNumber) {
    const findTrea = await db.manyorNone(
      `select * from stylist  where phone_number = $1`,
      [phoneNumber]
    );
    return findTrea;
  }

  async function findAllBookings(client) {
    const allBookings = await db.manyOrNone(
      `select * from booking where booking_date = $1`,
      [client]
    );
    return allBookings;
  }

  async function findClientBookings(client) {
    const clientBook = await db.manyOrNone(
      `select * from booking where client_id = $1`,
      [client]
    );
    return clientBook;
  }

  return {
    findAllTreatments,
    findStylist,
    findClient,
    findClient,
    makeBooking,
    findTreatment,
    findAllBookings,
    findClientBookings,
  };
}
