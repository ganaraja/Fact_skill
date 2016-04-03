/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Cricket Geek for a cricket fact"
 *  Alexa: "Here's your cricket fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing cricket facts.
 */
var CRICKET_FACTS = [
    "Sri Lanka has a sole Test win against the Aussies till date.",
    "Sanath Jayasuriya has more One Day International wickets than Shane Warne. ",
    "The highest number of runs scored in an over is not 36. It is 77.",
    "Adam Gilchrist holds the record for playing the most number of Tests straight after debut.",
    "On 12th January 1964, Indian spinner Bapu Nadkarni bowled 21 consecutive maiden overs versus England at Chennai.",
    "Chris Martin and B.S Chandrasekhar have taken more Test wickets in their career than the test runs they scored.",
    "In a World Cup Match, chasing 335, Sunil Gavaskar scored an unbeaten 36 off 174 balls.",
    "Jim Laker once took 19 wickets in a Test match.",
    "Saurav Ganguly is the only Indian player to score a century in the knock out stages of a World Cup.",
    "After Virat Kohli’s debut, India has chased down 300+ targets five times.",
    "Mahela Jayawardene is the only batsman to have scored centuries in both the Semi-Final and Final of a World Cup.",
    "The player with the most number of not outs in Test cricket is not Rahul Dravid, but Courtney Walsh.",
    "Saurav Ganguly is the only player to win four consecutive Man of the Match awards in One Day Internationals.",
    "Chris Gayle is the only batsman to hit a six off the first ball of a Test match",
    "Abbas Ali Baig was the first Indian cricketer to be kissed during a Test match",
    "Sunil Gavaskar was out off the first ball of a Test match thrice in his career",
    "Jaisimha and Ravi Shastri are the only Indians to bat on all five days of a Test",
    "The only cricketer to play Test cricket for India and England is Iftikhar Ali Khan Pataudi",
    "Lala Amarnath is the only bowler to dismiss Don Bradman hit wicket in Test cricket",
    "India won their second World Cup 28 years later in 2011 and remarkably won their second ever Test at Lord’s three years later in 2014.",
    "India is the only country to win the 60-Over, 50-Over and 20-Over World Cup",
    "Australia beat England by 45 runs in the first ever cricket Test as well as the Centenary Test in 1977",
    "Richard Stokes is the only one person who witnessed Jim Laker and Anil Kumble taking 10 wickets in an innings"

];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * CricketGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var CricketGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
CricketGeek.prototype = Object.create(AlexaSkill.prototype);
CricketGeek.prototype.constructor = CricketGeek;

CricketGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("CricketGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

CricketGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("CricketGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
CricketGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("CricketGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

CricketGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Cricket Geek tell me a cricket fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random cricket fact from the cricket facts list
    var factIndex = Math.floor(Math.random() * CRICKET_FACTS.length);
    var fact = CRICKET_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your cricket fact: " + fact;

    response.tellWithCard(speechOutput, "CricketGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the CricketGeek skill.
    var cricketGeek = new CricketGeek();
    cricketGeek.execute(event, context);
};
