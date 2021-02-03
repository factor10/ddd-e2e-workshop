# Lab 3: Test first

This lab has mulitple steps. Start with task 1 and work your way down. You don't have to complete them all, we have deliberately created many tasks for you to practice on.

We use the same user story as before: Add time registration

> _As a_ consultant
>
> _I want to_ register my spent time
>
> _So that_ the customer is billed correctly

## Goals

- Practice writing e2e UI tests _before_ writing the production code.

## Task 1

Implement the new scenario: Human readable total duration

Write a test, or update an existing) for the following scenario:

> _Given_ a registration for 200 min
>
> _When_ listing all registrations
>
> _Then_ total duration should be shown as 3 h 20 min

You should now have a failing test because of the "incorrect" presentation of total duration. Now, make the test pass by changing production code.

A great places to start looking is `src/domain-model/Day.ts`

## Task 2

Implement the new scenario: Filter list of days by consultant

Here's some BDD syntax to get you started:

> _Given_ that consultant Stina exists and has no registrations for 2021-02-02
>
> _When_ Stina registers 200 min for 2021-02-02
>
> _Then_ Stinas total duration for 2021-02-02 should be shown as 3 h 20 min

## Task 3

Implement the new scenario: Filter list of days by date

This time you on your own with the BDD syntax :)

## Task 4

Implement the new scenario: Show total duration for all visible days.

## Task 5

Give Cucumber+Cypress a try!

Try to convert one BDD text to a running test using Cucumber syntax and this framework https://github.com/TheBrainFamily/cypress-cucumber-preprocessor
