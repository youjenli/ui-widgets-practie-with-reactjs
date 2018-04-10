/// <reference types="react" />
import * as React from 'react';

interface TeamMemberProps {
    imgSrc:string,
    name:string,
    jobTitle:string,
    introduction:string,
    email:string
}

export class TeamMember extends React.Component<TeamMemberProps> {
    render () {
        return (
            <div className="teamMember">
                    <img src={this.props.imgSrc} alt={this.props.name} />
                    <h2 className="name">{this.props.name}</h2>
                    <h5 className="jobTitle">{this.props.jobTitle}</h5>
                    <p className="introduction">{this.props.introduction}</p>
                    <p className="email"><i>{this.props.email}</i></p>
                    <div className="contactPanel">
                        <button className="contactBtn">Contact</button>
                    </div>
            </div>
        );
    }
}

export class TeamPresentation extends React.Component {
    render () {
        const teamMembers = [{
            imgSrc:"https://www.w3schools.com/w3images/team1.jpg",
            name:"Jane Doe",
            jobTitle:"CEO & Founder",
            introduction:"Phasellus eget enim eu lectus faucibus vestibulum.",
            email:"example@example.com"
        },{
            imgSrc:"https://www.w3schools.com/w3images/team2.jpg",
            name:"Mike Ross",
            jobTitle:"Art Director",
            introduction:"Phasellus eget enim eu lectus faucibus vestibulum.",
            email:"example@example.com"
        },{
            imgSrc:"https://www.w3schools.com/w3images/team3.jpg",
            name:"John Doe",
            jobTitle:"Designer",
            introduction:"Phasellus eget enim eu lectus faucibus vestibulum.",
            email:"example@example.com"
        }];

        return (
            <div className="teamPresentation">
                <TeamMember imgSrc={teamMembers[0].imgSrc} name={teamMembers[0].name} jobTitle={teamMembers[0].jobTitle} introduction={teamMembers[0].introduction} email={teamMembers[0].email}/>
                <TeamMember imgSrc={teamMembers[1].imgSrc} name={teamMembers[1].name} jobTitle={teamMembers[1].jobTitle} introduction={teamMembers[1].introduction} email={teamMembers[1].email}/>
                <TeamMember imgSrc={teamMembers[2].imgSrc} name={teamMembers[2].name} jobTitle={teamMembers[2].jobTitle} introduction={teamMembers[2].introduction} email={teamMembers[2].email}/>
            </div>
        );
    }
}