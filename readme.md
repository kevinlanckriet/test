# WeatherFeelings API

* This project is made to co-relate peoples' mood to the weather. Intended (for myself) to have a simple but solid template
API that has been developped using TDD. Intended for researchers who could use this use-case to study the weather/mood relation.

## Installation

* Have Docker installed

* Initalisation: To have the least possibilities of bugs follow these steps.
- In API/dockerfile @ line 15 set second string to 'start'
- Build the API with docker-compose
- Run the API with docker-compose
- Change API/dockerfile @ line 15 back to 'test' to run the api with testing
- Run the API with docker-compose

## Contributing
Please refer to the contributing_guidelines


## License
[MIT](https://choosealicense.com/licenses/mit/)