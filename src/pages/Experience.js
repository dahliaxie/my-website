import React from 'react';
import ExperienceItem from '../components/ExperienceItem'; // Adjust the path as needed
import '../styles/Experience.css'
import MusicPlayer from '../components/MusicPlayer';

const Experience = () => {
  const experiences = [
    {
      title: 'Executive Web Editor',
      company: 'The Palouse Review',
      date: 'October 2019 – May 2023',
      responsibilities: [
        'Reviewed and assessed 40+ submissions collaboratively with student and faculty editors, determining content for publication',
        'Trained and mentored web editor team members in WordPress, streamlining the editorial process and enhancing efficiency',
        'Successfully published 6 bi-annual editions of the Palouse Review, ensuring high-quality content delivery.'
      ]
    },
    {
      title: 'Full Stack Engineering Intern',
      company: 'Inward',
      date: 'October 2022 – December 2022',
      responsibilities: [
        'Organized and exported over 70 contacts worth of data from Keap for simplified analysis',
        'Collaborated with co-founders to develop a list of valuable company web modifications',
        'Executed website changes including recategorizing information and pages',
        'Analyzed company data and implemented UTM tracking via Google Analytics to increase customer conversion'
      ]
    },
    {
        title: 'Software Engineering Intern ',
        company: 'Poatek',
        date: 'June 2022 – August 2022',
        responsibilities: [
          'Automated the process of tracking hours spent on client projects utilizing React, Typescript, Swagger, Microsoft SQL Management Server, and Postman',
          'Designed a sidebar connected to the back end that defines a new project object and sends a post request to add the project to a SQL database',
          'Programmed POST and DELETE API endpoints in Swagger that allowed users to add or delete Task objects to the Task database'
        ]
      },
          {
      title: 'Web Development Intern',
      company: 'Chase Cost Management',
      date: 'March 2022 – May 2022',
      responsibilities: [
        'Developed a login portal to allow clients to view data visualizations of their savings from Qlik',
        'Identified and began implementing a list of ~10 changes to help modernize CCM\'s website',
        'Created using React, Flask, WordPress, WP Elementor, XAMPP, MySQL, PhpMyAdmin, and Qlik Sense'
      ]
    },
    {
        title: 'UX Design Intern',
        company: 'Liberty Mutual Insurance',
        date: 'June 2021 – August 2021',
        responsibilities: [
          'Conducted user interviews to better understand the utility of UX across the company',
          'Researched and documented 20+ general UX design principles at a high level',
          'Produced product wireframes in Figma'
        ]
      },
      {
        title: 'General Manager',
        company: 'KZUU',
        date: 'August 2020 – May 2021',
        responsibilities: [
          'Pioneered the transition of traditionally in-studio radio shows to remote formats during COVID-19, ensuring seamless broadcasting',
          'Led the launch of a new station website on WordPress, resulting in an 188% increase in site traffic within one year',
          'Managed and trained a team of 24 individuals, fostering a collaborative and productive work environment',
          'Scheduled and posted over 140 music reviews and interviews, engaging the audience and enhancing the station\'s reputation.'
        ]
      },
      {
        title: 'Mainframe Intern',
        company: 'Liberty Mutual Insurance',
        date: 'May 2020 – August 2020',
        responsibilities: [
          'Wireframed and programmed a landing page for the Mainframe team using Vue.JS, JavaScript, and CSS',
          'Customized four icons for the Mainframe Team in Adobe Illustrator'
        ]
      },
      {
        title: 'Software Engineering Intern',
        company: 'EagleView',
        date: 'June 2019 – August 2019',
        responsibilities: [
          'Implemented a health check monitor that checks the status of various microservices using ASP.NET core, C#, JavaScript, Bootstrap, and CSS',
          'Integrated the project into Slack, allowing the team to receive real-time notifications when any microservices are not working'          
        ]
      },
  ];

  return (
    <div className="experience-page"> 
        <MusicPlayer
          audioUrl="/song.mp3"
          songTitle="heaven can wait"
          artist="organ tapes"
        />
        <div className="experience-container">
            <h2>EXPERIENCE</h2>
            {experiences.map((experience, index) => (
                <React.Fragment key={index}>
                    <ExperienceItem
                        company={experience.company}
                        title={experience.title}
                        date={experience.date}
                        responsibilities={experience.responsibilities}
                    />
                    {((index + 1) % 3 === 0) && <div className="experience-space" />} {/* Add a whitespace block every three experiences */}
                </React.Fragment>
            ))}
        </div>
    </div>
);

};

export default Experience;
