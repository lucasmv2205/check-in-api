# Nodejs App

Gym check-in app.

## Functional Requirements (FRs)

- [x] Users should be able to register;
- [x] Users should be able to authenticate;
- [x] Users should be able to retrieve their logged-in profile;
- [x] Users should be able to get the number of check-ins they have made;
- [x] Users should be able to access their check-in history;
- [x] Users should be able to search for nearby gyms (10Km);
- [x] Users should be able to search for gyms by name;
- [x] Users should be able to check-in at a gym;
- [x] Users should be able to validate their check-in;
- [x] It should be possible to register a gym;

## Business Rules (BRs)

- [x] Users should not be able to register with a duplicate email;
- [x] Users should not be able to make two check-ins on the same day;
- [x] Users should not be able to check-in if they are not within 100 meters of the gym;
- [x] Check-ins can only be validated within 20 minutes of being created;
- [x] Check-ins can only be validated by administrators;
- [x] Gyms can only be registered by administrators;

## Non-Functional Requirements (NFRs)

- [x] User passwords need to be encrypted;
- [x] Application data needs to be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [x] Users should be identified by a JWT (JSON Web Token);
