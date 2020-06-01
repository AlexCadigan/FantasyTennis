# Technical Notes

## File Structure
* **Config** - Application-wide configuration.
* **CronJobScripts** - Sripts run automatically and cyclically.  Used to scrap data from websites and update the database.
	* **Lib** - Core pieces of functionality used by multiple scripts, such as parsing the HTML DOM.
	* **OnceADay** - Scripts run once a day.

## Database Structure
Structure of the SQL database's tables.

### Players
| Name          | Price               | CurrentPoints                  |
| ------------- | ------------------- | ------------------------------ |
| char          | double              | double                         |
| Player's name | Price of the player | Points player earned this week |

### Weeks
| Week        | StartDate         | IsCurrent                   |
| ----------- | ----------------- | --------------------------- |
| int         | Date              | Boolean                     |
| Week number | Week's start date | If this is the current week |

### Tournaments
| Name            | Week                  | Year                  |
| --------------- | --------------------- | --------------------- |
| char            | int                   | Year                  |
| Tournament name | Week tournament is in | Year tournament is in |
