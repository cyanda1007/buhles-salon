import assert from "assert";
import SalonBooking from "../salon-booking.js";
import pgPromise from "pg-promise";

// TODO configure this to work.
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:Cyanda@100%@localhost:5432/salon_booking";

const config = {
  connectionString: DATABASE_URL,
};

const pgp = pgPromise();
const db = pgp(config);

let booking = SalonBooking(db);

describe("The Booking Salon", function () {
  beforeEach(async function () {
    await db.none(`delete from booking`);
    await db.none(`delete from client`);
    await db.none(`delete from stylist`);
    await db.none(`delete from treatment`);
  });

  it("should be able to list treatments", async function () {
    const treatments = await booking.findAllTreatments();
    assert.equal("Predicure", treatments);
  });

  it("should be able to find a stylist", async function () {
    const stylist = await booking.findStylist("phoneNumber");
    assert.equal("", stylist);
  });

  it("should be able to allow a client to make a booking", async function () {
    const client = await booking.findClient("phoneNumber");

    const booking = await booking.makeBooking(
      treatmentId,
      client.id,
      date,
      time
    );

    const bookings = await booking.findClientBookings(client.id);
    assert.equal([], bookings);
  });

  it("should be able to get client booking(s)", async function () {
    const client1 = await booking.findClient("phoneNumber");
    const client2 = await booking.findClient("phoneNumber");

    const treatment1 = await booking.findTreatment("phoneNumber");
    const treatment2 = await booking.findTreatment("phoneNumber");

    await booking.booking(treatment1.id, client1.id, date, time);
    await booking.booking(treatment2.id, client1.id, date, time);
    await booking.booking(treatment1.id, client2.id, date, time);

    const bookings = await booking.findAllBookings(client);

    assert.equal([], clientBooking);
  });

  it("should be able to get bookings for a date", async function () {
    const client1 = await booking.findClient("phoneNumber");
    const client2 = await booking.findClient("phoneNumber");

    const treatment1 = await booking.findTreatment("phoneNumber");
    const treatment2 = await booking.findTreatment("phoneNumber");

    await booking.booking(treatment1.id, client1.id, date, time);
    await booking.booking(treatment2.id, client1.id, date, time);
    await booking.booking(treatment3.id, client2.id, date, time);

    const bookings = await booking.findAllBookings({ date, time });

    assert.equal([], bookings);
  });

  it("should be able to find the total income for a day", function () {
    assert.equal(1, 2);
  });

  it("should be able to find the most valuable client", function () {
    assert.equal(1, 2);
  });
  it("should be able to find the total commission for a given stylist", function () {
    assert.equal(1, 2);
  });

  after(function () {
    db.$pool.end();
  });
});
