
export * from './GenericEchoCommand';

export * from './AwardCommand';
export * from './EducationCommand';
export * from './LanguageCommand';
export * from './PublicationCommand';
export * from './SkillCommand';
export * from './VolunteerCommand';
export * from './WorkCommand';

export interface Command<T> {

    name: string;
    description: string;
    action: Function;

}