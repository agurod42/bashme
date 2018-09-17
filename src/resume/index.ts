import { Award, Education, Language, Publication, Skill, Volunteer, Work } from './properties';

export class Resume {

    public name: string = 'noname';
    public bio: string = '';
    public education: Array<Education> = [];
    public work: Array<Work> = [];
    public volunteer: Array<Volunteer> = [];
    public awards: Array<Award> = [];
    public publications: Array<Publication> = [];
    public skills: Array<Skill> = [];
    public languages: Array<Language> = [];

    addEducation(education: Array<Education>) {
        this.education = this.education.concat(education);
    }

    addWork(work: Array<Work>) {
        this.work = this.work.concat(work);
    }

    addVolunteer(volunteer: Array<Volunteer>) {
        this.volunteer = this.volunteer.concat(volunteer);
    }

    addAwards(awards: Array<Award>) {
        this.awards = this.awards.concat(awards);
    }

    addPublications(publications: Array<Publication>) {
        this.publications = this.publications.concat(publications);
    }

    addSkills(skills: Array<Skill>) {
        this.skills = this.skills.concat(skills);
    }

    addLanguages(languages: Array<Language>) {
        this.languages = this.languages.concat(languages);
    }

}