import { Award, Education, Language, Publication, Skill, Volunteer, Work } from '../../resume/properties';
import { Resume } from '../../resume';
import { IntroProvider, AwardProvider, EducationProvider, LanguageProvider, PublicationProvider, SkillProvider, VolunteerProvider, WorkProvider } from '../../resume/providers';

export class Json implements IntroProvider, AwardProvider, EducationProvider, LanguageProvider, PublicationProvider, SkillProvider, VolunteerProvider, WorkProvider {

    private data: any;

    constructor(object: object) {
        this.data = object;
    }

    getName(): string {
        return this.data.name;
    }

    getBio(): string {
        return this.data.bio;
    }

    getEducation(): Array<Education> {
        return this.data.education || [];
    }

    getWork(): Array<Work> {
        return this.data.work || [];
    }

    getVolunteer(): Array<Volunteer> {
        return this.data.volunteer || [];
    }

    getAward(): Array<Award> {
        return this.data.award || [];
    }

    getPublication(): Array<Publication> {
        return this.data.publication || [];
    }

    getSkill(): Array<Skill> {
        return this.data.skill || [];
    }

    getLanguage(): Array<Language> {
        return this.data.language || [];
    }
    
    fill(resume: Resume): void {
        resume.name = this.getName();
        resume.bio = this.getBio();
        resume.addEducation(this.getEducation());
        resume.addWork(this.getWork());
        resume.addVolunteer(this.getVolunteer());
        resume.addAward(this.getAward());
        resume.addPublication(this.getPublication());
        resume.addSkill(this.getSkill());
        resume.addLanguage(this.getLanguage());
    }

}