# Instructions

Node version in `.nvmrc`

1. Start MySQL container that imports supplied .sql file

    `docker compose up -d`

2. Install required modules

    `npm i`

3. Start app

    `npm run start`

4. Example queries

    `curl "localhost:3000/create_payment_note?period_from_datetime=2021-08-19T00:00:00.000Z&period_to_datetime=2021-08-19T00:59:59.999Z"`

    `curl localhost:3000/all_payment_notes`

    `curl localhost:3000/payment_note/PAYMENT_UUID`

Table definition for payment_note shown in `payment_note.sql`. Table is created automatically if not alread in database.


