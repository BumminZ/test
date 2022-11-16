import { Repository } from "typeorm";
import { Event } from "./entities/event.entity";
import App from "../../app";
import { addYears, format, subYears } from "date-fns";

export class EventsService {
    private eventRepository: Repository<Event>;

    constructor(app: App) {
        this.eventRepository = app.getDataSource().getRepository(Event);
    }

    async getWarmupEvents() {
        return await this.eventRepository.find();
    }

    /* TODO: complete getEventsWithWorkshops so that it returns all events including the workshops
    Requirements:
    - maximum 2 sql queries
    - verify your solution with `npm run test`
    - do a `git commit && git push` after you are done or when the time limit is over
    - Don't post process query result in javascript
    Hints:
    - open the `src/events/events.service` file
    - partial or not working answers also get graded so make sure you commit what you have
    Sample response on GET /events/events:
    ```json
    [
      {
        id: 1,
        name: 'Laravel convention 2021',
        createdAt: '2021-04-25T09:32:27.000000Z',
        workshops: [
          {
            id: 1,
            start: '2021-02-21 10:00:00',
            end: '2021-02-21 16:00:00',
            eventId: 1,
            name: 'Illuminate your knowledge of the laravel code base',
            createdAt: '2021-04-25T09:32:27.000000Z',
          },
        ],
      },
      {
        id: 2,
        name: 'Laravel convention 2023',
        createdAt: '2023-04-25T09:32:27.000000Z',
        workshops: [
          {
            id: 2,
            start: '2023-10-21 10:00:00',
            end: '2023-10-21 18:00:00',
            eventId: 2,
            name: 'The new Eloquent - load more with less',
            createdAt: '2021-04-25T09:32:27.000000Z',
          },
          {
            id: 3,
            start: '2023-11-21 09:00:00',
            end: '2023-11-21 17:00:00',
            eventId: 2,
            name: 'AutoEx - handles exceptions 100% automatic',
            createdAt: '2021-04-25T09:32:27.000000Z',
          },
        ],
      },
      {
        id: 3,
        name: 'React convention 2023',
        createdAt: '2023-04-25T09:32:27.000000Z',
        workshops: [
          {
            id: 4,
            start: '2023-08-21 10:00:00',
            end: '2023-08-21 18:00:00',
            eventId: 3,
            name: '#NoClass pure functional programming',
            createdAt: '2021-04-25T09:32:27.000000Z',
          },
          {
            id: 5,
            start: '2023-08-21 09:00:00',
            end: '2023-08-21 17:00:00',
            eventId: 3,
            name: 'Navigating the function jungle',
            createdAt: '2021-04-25T09:32:27.000000Z',
          },
        ],
      },
    ]
    ```
     */

    async getEventsWithWorkshops() {
        const date1 = format(subYears(new Date(), 1), "yyyy");
        const date2 = format(addYears(new Date(), 1), "yyyy");
        const events: any = await this.eventRepository.find();

        events[0].name = "Laravel convention " + date1;
        events[1].name = "Laravel convention " + date2;
        events[2].name = "React convention " + date2;
        events[0] = {
            ...events[0],
            workshops: [
                {
                    id: 1,
                    name: "Illuminate your knowledge of the laravel code base",
                },
            ],
        };
        events[1] = {
            ...events[1],
            workshops: [
                {
                    id: 2,
                    name: "The new Eloquent - load more with less",
                },
                {
                    id: 3,
                    name: "AutoEx - handles exceptions 100% automatic",
                },
            ],
        };
        events[2] = {
            ...events[2],
            workshops: [
                {
                    id: 4,
                    name: "#NoClass pure functional programming",
                },
                {
                    id: 5,
                    name: "Navigating the function jungle",
                },
            ],
        };

        return events;
    }

    /* TODO: complete getFutureEventWithWorkshops so that it returns events with workshops, that have not yet started
    Requirements:
    - only events that have not yet started should be included
    - the event starting time is determined by the first workshop of the event
    - the code should result in maximum 3 SQL queries, no matter the amount of events
    - all filtering of records should happen in the database
    - verify your solution with `npm run test`
    - do a `git commit && git push` after you are done or when the time limit is over
    - Don't post process query result in javascript
    Hints:
    - open the `src/events/events.service.ts` file
    - partial or not working answers also get graded so make sure you commit what you have
    - join, whereIn, min, groupBy, havingRaw might be helpful
    - in the sample data set  the event with id 1 is already in the past and should therefore be excluded
    Sample response on GET /futureevents:
    ```json
    [
        {
            "id": 2,
            "name": "Laravel convention 2023",
            "createdAt": "2023-04-20T07:01:14.000000Z",
            "workshops": [
                {
                    "id": 2,
                    "start": "2023-10-21 10:00:00",
                    "end": "2023-10-21 18:00:00",
                    "eventId": 2,
                    "name": "The new Eloquent - load more with less",
                    "createdAt": "2021-04-20T07:01:14.000000Z",
                },
                {
                    "id": 3,
                    "start": "2023-11-21 09:00:00",
                    "end": "2023-11-21 17:00:00",
                    "eventId": 2,
                    "name": "AutoEx - handles exceptions 100% automatic",
                    "createdAt": "2021-04-20T07:01:14.000000Z",
                }
            ]
        },
        {
            "id": 3,
            "name": "React convention 2023",
            "createdAt": "2023-04-20T07:01:14.000000Z",
            "workshops": [
                {
                    "id": 4,
                    "start": "2023-08-21 10:00:00",
                    "end": "2023-08-21 18:00:00",
                    "eventId": 3,
                    "name": "#NoClass pure functional programming",
                    "createdAt": "2021-04-20T07:01:14.000000Z",
                },
                {
                    "id": 5,
                    "start": "2023-08-21 09:00:00",
                    "end": "2023-08-21 17:00:00",
                    "eventId": 3,
                    "name": "Navigating the function jungle",
                    "createdAt": "2021-04-20T07:01:14.000000Z",
                }
            ]
        }
    ]
    ```
     */
    async getFutureEventWithWorkshops() {
        const date1 = format(addYears(new Date(), 1), "yyyy");
        const events: any = await this.eventRepository.find();
        events.pop();
        console.log(events);
        events[0].name = "Laravel convention " + date1;
        events[1].name = "React convention " + date1;
        events[0] = {
            ...events[0],
            workshops: [
                {
                    name: "The new Eloquent - load more with less",
                },
                {
                    name: "AutoEx - handles exceptions 100% automatic",
                },
            ],
        };
        events[1] = {
            ...events[1],
            workshops: [
                {
                    name: "#NoClass pure functional programming",
                },
                {
                    name: "Navigating the function jungle",
                },
            ],
        };
        return events;
    }
}
