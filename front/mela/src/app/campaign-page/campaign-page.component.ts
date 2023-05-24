import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.css']
})
export class CampaignPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

  }


  campaign = {
    Id: "1",
      title: "Campaign Title 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel lacus tellus. Nulla in sodales enim. Phasellus rutrum euismod magna, et tristique odio bibendum sit amet.",
      story: `Hello everyone, My name is Jamie Navarro, mother of Ruby Navarro. Both Ruby's dad (Roberto) and I are asking for any help we can get. Prayers, contributions or just sharing this page.
			For those who aren't aware, Ruby is my two-year-old daughter who was recently diagnosed with cancer in her blood "Leukemia (B-cell ALL). Our sweet Ruby Baby, will be treated at Bostons Children's Hospital where she will stay for her first initial 5 weeks of Chemotherapy. Rubys Chemotherapy is set to start tonight as this is the start of a long journey...over 2 years total. She's received 2 blood transfusions and 2 platelet transfusions. Heart breaking to see our little Princess go through such horrific treatment.`,
      creator: "kirubel Hayelom",
      imagePath: "https://via.placeholder.com/400x500",
      creatorImage: "https://via.placeholder.com/300x200",
      goalAmount: 10000,
      totalRaised: 5000,
      timeOfCreation: "6 days ago"
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const paramValue = paramMap.get('campaign-id');
      console.log(paramValue)
      this.campaigns.forEach(element => {
        if (element.Id === paramValue){
          this.campaign = element
        }
      });
  
    });
  }

  campaigns = [
    {
      Id: "1",
      title: "Campaign Title 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel lacus tellus. Nulla in sodales enim. Phasellus rutrum euismod magna, et tristique odio bibendum sit amet.",
      story: `Hello everyone, My name is Jamie Navarro, mother of Ruby Navarro. Both Ruby's dad (Roberto) and I are asking for any help we can get. Prayers, contributions or just sharing this page.
			For those who aren't aware, Ruby is my two-year-old daughter who was recently diagnosed with cancer in her blood "Leukemia (B-cell ALL). Our sweet Ruby Baby, will be treated at Bostons Children's Hospital where she will stay for her first initial 5 weeks of Chemotherapy. Rubys Chemotherapy is set to start tonight as this is the start of a long journey...over 2 years total. She's received 2 blood transfusions and 2 platelet transfusions. Heart breaking to see our little Princess go through such horrific treatment.`,
      creator: "Abebe geleta",
      imagePath: "https://via.placeholder.com/400x500",
      creatorImage: "https://via.placeholder.com/300x200",
      goalAmount: 10000,
      totalRaised: 5000,
      timeOfCreation: "6 days ago"
    },
    {
      Id: "2",
      title: "Campaign Title 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel lacus tellus. Nulla in sodales enim. Phasellus rutrum euismod magna, et tristique odio bibendum sit amet.",
      story: `Hello everyone, My name is Jamie Navarro, mother of Ruby Navarro. Both Ruby's dad (Roberto) and I are asking for any help we can get. Prayers, contributions or just sharing this page.
			For those who aren't aware, Ruby is my two-year-old daughter who was recently diagnosed with cancer in her blood "Leukemia (B-cell ALL). Our sweet Ruby Baby, will be treated at Bostons Children's Hospital where she will stay for her first initial 5 weeks of Chemotherapy. Rubys Chemotherapy is set to start tonight as this is the start of a long journey...over 2 years total. She's received 2 blood transfusions and 2 platelet transfusions. Heart breaking to see our little Princess go through such horrific treatment.`,
      creator: "Leul Hayilom",
      imagePath: "https://via.placeholder.com/300x200",
      creatorImage: "https://via.placeholder.com/300x200",
      goalAmount: 10000,
      totalRaised: 5000,
      timeOfCreation: "6 days ago"
    },
    {
      Id: "3",
      title: "Campaign Title 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel lacus tellus. Nulla in sodales enim. Phasellus rutrum euismod magna, et tristique odio bibendum sit amet.",
      story: `Hello everyone, My name is Jamie Navarro, mother of Ruby Navarro. Both Ruby's dad (Roberto) and I are asking for any help we can get. Prayers, contributions or just sharing this page.
			For those who aren't aware, Ruby is my two-year-old daughter who was recently diagnosed with cancer in her blood "Leukemia (B-cell ALL). Our sweet Ruby Baby, will be treated at Bostons Children's Hospital where she will stay for her first initial 5 weeks of Chemotherapy. Rubys Chemotherapy is set to start tonight as this is the start of a long journey...over 2 years total. She's received 2 blood transfusions and 2 platelet transfusions. Heart breaking to see our little Princess go through such horrific treatment.`,
      creator: "Amanual Sisay",
      imagePath: "https://via.placeholder.com/300x200",
      creatorImage: "https://via.placeholder.com/300x200",
      goalAmount: 10000,
      totalRaised: 5000,
      timeOfCreation: "6 days ago"
    }
  ];
}
