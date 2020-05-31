# Technical Notes

## File Structure
* **Config** - Application-wide configuration.
* **CronJobScripts** - Sripts that are run automatically and cyclically.  Used to scrap data from websites and update the database.
	* **Lib** - Core pieces of functionality used by multiple scripts, such as parsing the HTML DOM.
	* **OnceADay** - Scripts run once a day.

## Database Structure

### Players
| Name          | Price               | CurrentPoints                      |
| ------------- | ------------------- | ---------------------------------- |
| char          | double              | double                             |
| Player's name | Price of the player | Points player has earned this week |
