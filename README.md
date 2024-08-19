# Hasura Task Subscription Application

## Overview

This repository contains a ReactJS application built with TypeScript and Apollo Client. The current application displays a list of tasks in real-time using a Hasura GraphQL subscription. Your task is to extend this application by adding the ability to create and update tasks via GraphQL mutations.

## Test Instructions

### Objective

Your objective is to fork this repository and implement the following features:

1. **Task Creation:** Implement functionality to create new tasks using a GraphQL mutation.
2. **Task Update:** Implement functionality to update existing tasks using a GraphQL mutation.
3. **UI/UX Enhancements:** Design a user-friendly interface for creating and updating tasks.
4. **Follow Coding Conventions:** Ensure your code adheres to the existing coding conventions and is well-documented.
5. **Testing:** Write unit tests for the new features you implement.

### Requirements

1. **Fork the Repository:**
   - Fork this repository to your GitHub account.

2. **Clone the Repository:**
   - Clone the forked repository to your local machine:
     ```bash
     git clone <your-forked-repo-url>
     cd hasura-task-subscription
     ```

3. **Install Dependencies:**
   - Install all necessary dependencies:
     ```bash
     npm install
     # or
     yarn install
     ```

4. **Feature 1: Task Creation**
   - Implement a feature that allows users to create new tasks via a GraphQL mutation.
   - Ensure the new task appears in the task list in real-time, utilizing the existing subscription.

5. **Feature 2: Task Update**
   - Implement a feature that allows users to update an existing task.
   - The updated task should be reflected in the task list in real-time.

6. **UI/UX Enhancements**
   - Design a user-friendly interface for creating and updating tasks.
   - Consider using a modal or a separate form for task creation and editing.
   - Provide user feedback during the creation and update process.

7. **Coding Conventions**
   - Follow the existing coding conventions used in this project.
   - Use TypeScript types where appropriate and ensure your code is well-documented.

8. **Testing**
   - Write unit tests for the new components and logic you have implemented.
   - Ensure both the creation and update functionalities are covered by tests.

9. **Optional Challenge**
   - Implement optimistic UI updates for creating and updating tasks.
   - Handle errors gracefully, providing feedback to the user if a mutation fails.

### Submission

1. **Commit Your Changes:**
   - Once you have completed the task, commit your changes to a new branch in your forked repository.

2. **Push Your Changes:**
   - Push your changes to your forked repository on GitHub.

3. **Submit Your Repository URL:**
   - Submit the URL of your forked repository with your changes for review.

### Evaluation Criteria

Your submission will be evaluated based on the following criteria:

- **Correctness:** Does the implementation meet the requirements?
- **Code Quality:** Is the code clean, well-organized, and consistent with the project's coding standards?
- **UI/UX:** Is the interface intuitive, responsive, and visually appealing?
- **Testing:** Are there sufficient tests, and do they effectively cover the new features?
- **Problem-Solving:** How well did you handle any challenges or complexities in the task?

### Good Luck!

We look forward to reviewing your work. If you have any questions, please feel free to reach out.

