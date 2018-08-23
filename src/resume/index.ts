import { Award, Education, Language, Publication, Skill, Volunteer, Work } from './properties';

export class Resume {

    public name: string = 'noname';
    public bio: string = '';
    public education: Array<Education> = [];
    public work: Array<Work> = [];
    public volunteer: Array<Volunteer> = [];
    public award: Array<Award> = [];
    public publication: Array<Publication> = [];
    public skill: Array<Skill> = [];
    public language: Array<Language> = [];

    addEducation(education: Array<Education>) {
        this.education = this.education.concat(education);
    }

    addWork(work: Array<Work>) {
        this.work = this.work.concat(work);
    }

    addVolunteer(volunteer: Array<Volunteer>) {
        this.volunteer = this.volunteer.concat(volunteer);
    }

    addAward(award: Array<Award>) {
        this.award = this.award.concat(award);
    }

    addPublication(publication: Array<Publication>) {
        this.publication = this.publication.concat(publication);
    }

    addSkill(skill: Array<Skill>) {
        this.skill = this.skill.concat(skill);
    }

    addLanguage(language: Array<Language>) {
        this.language = this.language.concat(language);
    }

}