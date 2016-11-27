const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const education = data.education;
const hobbies = data.hobbies;
const classes = data.classes;

dbConnection().then((db) => {
    return db.dropDatabase().then(() => {
            return dbConnection;
        }).then((db) => {
            return education.addSchool("Anqing Normal University", "undergrad", "Bachelor of Science in Information and Computing Science");
        }).then(() => {
            return education.addSchool("Hefei 168 High School", "highschool");
        }).then(() => {
            console.log("Done seeding education"); 
        }).catch((error) => {
            return Promise.reject("Seeding Education Error");
        })
        .then(() => {
            return hobbies.addHobby("running", "Running makes you happier. Running helps you get fit. Running strengthens your knees (and your other joints and bones, too). Running will keep you sharper, even as you age. Running can reduce your risk of cancer. Running adds years to your life. ");
        }).then(() => {
            return hobbies.addHobby("hiking", "Improved cardio-respiratory fitness (heart, lungs, blood vessels). Improved muscular fitness. Lower risk of coronary heart disease and stroke. Lower risk of high blood pressure and type 2 diabetes. Lower risk of high cholesterol and triglycerides. ");
        }).then(() => {
            return hobbies.addHobby("playing tennis", "Full body workout. Improved aerobic and anaerobic health. Burns calories and fat. Improves bone health. Heart healthy. Enhances flexibility, balance and coordination. Boosts brain power. Is great cross-training for other sports. ");            
        }).then(() => {
            console.log("Done seeding hobbies");
        }).catch((error) => {
            return Promise.reject("Seeding Hobbies Error");
        })
        .then(() => {
            return classes.addClass("Intro Program/Data Struct/Algor","CS","590","David Pfeffer","The course introduces students to basic and intermediate data structures and algorithms. It is assumed that students are capable C++ programmers or are exceptionally strong programmers in another object oriented language and are willing to learn C++ as they take this course. Students that do not have the requisite knowledge are encouraged to take CS 570 instead.");
        }).then(() => {
            return classes.addClass("Introduction to Operating Sys.","CS","520","Igor Faynberg","CS 520 systematically introduces the relevant problems  and demonstrates how they have been traditionally solved in the evolving combination of the operating systems software and the hardware it supports. You will also learn an important engineering technique of  discrete event simulation and write programs that simulate various aspects of multiprocessing.");
        }).then(() => {
            return classes.addClass("Knowledge Dis & Data Mining","CS","513","Khasha Dehnad","Familiarity with the principals of statistics and probabilities; for example, completion of MGT 502 (no credit). Books, Notes, and Manuals: Discovering Knowledge in Data: An introduction to Data Mining, Daniel T. Larose, John Wiley, latest edition");
        }).then(() => {
            return classes.addClass("Web Programming","CS","546","Philip Barresi","This course will provide students with a first strong approach of internet programming. It will give the basic knowledge on how the Internet works and how to create advanced web sites by the use of script languages, after learning the basics of HTML. The course will teach the students how to create a complex global site through the creation of individual working modules, giving them the skills required in any business such as proper team work and coordination between groups.");
        }).then(() => {
            return classes.addClass("Adv. Algorithm Dsgn & Implement","CS","600","Reza Peyrovian","Design, implementation, and asymptotic time and space analysis of advanced algorithms, as well as analyzing worst-case and average-case complexity of algorithms. Students will be expected to run experiments to test the actual performance of the algorithms on sample inputs. Introduction to NP-complete problems and approximation algorithms.");
        }).then(() => {
            return classes.addClass("Web Analytics","BIA","660","Theodoros Lappas","The course covers: Introduction to Python; Data collection from the Web; Parsing and cleaning of structured and unstructured text; Text mining; Introduction to Natural Language Processing (NLP); Topic Modeling; Supervised and unsupervised learning algorithms");
        }).then(() => {
            console.log("Done seeding classes");
            db.close();
        }).catch((error) => {
            return Promise.reject("Seeding Classes Error");
        });
}, (error) => {
    return Promise.reject("Connect Database Error");
});