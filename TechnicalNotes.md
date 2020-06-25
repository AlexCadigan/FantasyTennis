# Technical Notes

## Database Structure
Structure of the SQL database tables.

### Players
| Name          | Price               | CurrentPoints                  |
| ------------- | ------------------- | ------------------------------ |
| Primary       |                     |                                |
| char          | double              | double                         |
| Player's name | Price of the player | Points player earned this week |

### Weeks
| Week        | StartDate         | IsCurrent                   |
| ----------- | ----------------- | --------------------------- |
| Primary     | Primary           |                             |
| int         | Date              | Boolean                     |
| Week number | Week's start date | If this is the current week |

### Tournaments
| Name            | Week                  | Year                  |
| --------------- | --------------------- | --------------------- |
| Primary         |                       | Primary               |
| char            | int                   | Year                  |
| Tournament name | Week tournament is in | Year tournament is in |
