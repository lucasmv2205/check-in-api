# Nodejs App

Gym check-in app.

## Functional Requirements (FRs)

- [ ] Users should be able to register;
- [ ] Users should be able to authenticate;
- [ ] Users should be able to retrieve their logged-in profile;
- [ ] Users should be able to get the number of check-ins they have made;
- [ ] Users should be able to access their check-in history;
- [ ] Users should be able to search for nearby gyms;
- [ ] Users should be able to search for gyms by name;
- [ ] Users should be able to check-in at a gym;
- [ ] Users should be able to validate their check-in;
- [ ] It should be possible to register a gym;

## Business Rules (BRs)

- [ ] Users should not be able to register with a duplicate email;
- [ ] Users should not be able to make two check-ins on the same day;
- [ ] Users should not be able to check-in if they are not within 100 meters of the gym;
- [ ] Check-ins can only be validated within 20 minutes of being created;
- [ ] Check-ins can only be validated by administrators;
- [ ] Gyms can only be registered by administrators;

## Non-Functional Requirements (NFRs)

- [ ] User passwords need to be encrypted;
- [ ] Application data needs to be persisted in a PostgreSQL database;
- [ ] All data lists need to be paginated with 20 items per page;
- [ ] Users should be identified by a JWT (JSON Web Token);
