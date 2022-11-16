import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CinemaSystem1663877813247 implements MigrationInterface {
    /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "movie", // name of the table
                columns: [
                    {
                        name: "id", // name of the column
                        type: "uuid", // type of the column
                        isPrimary: true, // is this column the primary key?
                        generationStrategy: "uuid", // what is the generation strategy for this column?
                        default: "uuid_generate_v4()", // what is the default value for this column?
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "duration",
                        type: "integer",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "show",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "movieId",
                        type: "uuid",
                    },
                    {
                        name: "cinemaId",
                        type: "uuid",
                    },
                    {
                        name: "showroomId",
                        type: "uuid",
                    },
                    {
                        name: "showTime",
                        type: "timestamp",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "cinema",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "address",
                        type: "varchar",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "showroom",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "cinemaId",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "seat",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "showroomId",
                        type: "uuid",
                    },
                    {
                        name: "seatNumber",
                        type: "integer",
                    },
                    {
                        name: "seatType",
                        type: "varchar",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "ticket",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "showId",
                        type: "uuid",
                    },
                    {
                        name: "seatId",
                        type: "uuid",
                    },
                    {
                        name: "price",
                        type: "integer",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "seatType",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "integer",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "showroomSeatType",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "showroomId",
                        type: "uuid",
                    },
                    {
                        name: "seatTypeId",
                        type: "uuid",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            "show",
            new TableForeignKey({
                columnNames: ["movieId"],
                referencedColumnNames: ["id"],
                referencedTableName: "movie",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "show",
            new TableForeignKey({
                columnNames: ["cinemaId"],
                referencedColumnNames: ["id"],
                referencedTableName: "cinema",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "show",
            new TableForeignKey({
                columnNames: ["showroomId"],
                referencedColumnNames: ["id"],
                referencedTableName: "showroom",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "showroom",
            new TableForeignKey({
                columnNames: ["cinemaId"],
                referencedColumnNames: ["id"],
                referencedTableName: "cinema",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "seat",
            new TableForeignKey({
                columnNames: ["showroomId"],
                referencedColumnNames: ["id"],
                referencedTableName: "showroom",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "ticket",
            new TableForeignKey({
                columnNames: ["showId"],
                referencedColumnNames: ["id"],
                referencedTableName: "show",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "ticket",
            new TableForeignKey({
                columnNames: ["seatId"],
                referencedColumnNames: ["id"],
                referencedTableName: "seat",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "showroomSeatType",
            new TableForeignKey({
                columnNames: ["showroomId"],
                referencedColumnNames: ["id"],
                referencedTableName: "showroom",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "showroomSeatType",
            new TableForeignKey({
                columnNames: ["seatTypeId"],
                referencedColumnNames: ["id"],
                referencedTableName: "seatType",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "firstName",
                        type: "varchar",
                    },
                    {
                        name: "lastName",
                        type: "varchar",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "userRole",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "userId",
                        type: "uuid",
                    },
                    {
                        name: "roleId",
                        type: "uuid",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            "userRole",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "userRole",
            new TableForeignKey({
                columnNames: ["roleId"],
                referencedColumnNames: ["id"],
                referencedTableName: "role",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "reservation",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "userId",
                        type: "uuid",
                    },
                    {
                        name: "showId",
                        type: "uuid",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            "reservation",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "reservation",
            new TableForeignKey({
                columnNames: ["showId"],
                referencedColumnNames: ["id"],
                referencedTableName: "show",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: "reservationSeat",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",

                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "reservationId",
                        type: "uuid",
                    },
                    {
                        name: "seatId",
                        type: "uuid",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            "reservationSeat",
            new TableForeignKey({
                columnNames: ["reservationId"],
                referencedColumnNames: ["id"],
                referencedTableName: "reservation",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "reservationSeat",
            new TableForeignKey({
                columnNames: ["seatId"],
                referencedColumnNames: ["id"],
                referencedTableName: "seat",
                onDelete: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
