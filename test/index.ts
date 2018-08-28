import { expect } from 'chai';
import 'mocha';

import Clime from '../src';
import { Json } from '../src/resume/providers';

describe('Json infoProvider', function () {

    before(function() {
        Clime.use(new Json('test/data/agurodriguez.json'));
    });

    it('should fill name', function () {
        expect(Clime.resume.name).to.be.equal('Agustín Rodríguez');
    });

    it('should fill bio', function () {
        expect(Clime.resume.bio).to.be.equal('#coder #entrepreneur #optimist #dreamer #student');
    });

    it('should fill education', function () {
        expect(Clime.resume.education).to.have.length.greaterThan(0);
        expect(Clime.resume.education[0].university).to.be.equal('Universidad ORT Uruguay');
        expect(Clime.resume.education[0].degree).to.be.equal('System\'s Engineer');
        expect(Clime.resume.education[0].fieldOfStudy).to.be.equal('Computer Science');
        expect(Clime.resume.education[0].grade).to.be.equal(90);
        expect(Clime.resume.education[0].startYear).to.be.equal(2014);
        expect(Clime.resume.education[0].endYear).to.be.equal(2019);
    });

    it('should fill work', function () {
        expect(Clime.resume.work).to.have.length.greaterThan(0);
        expect(Clime.resume.work[0].company).to.be.equal('Universidad ORT Uruguay');
        expect(Clime.resume.work[0].position).to.be.equal('Professor Assistant');
        expect(Clime.resume.work[0].startMonth).to.be.equal(7);
        expect(Clime.resume.work[0].startYear).to.be.equal(2016);
        expect(Clime.resume.work[0].endMonth).to.be.equal(12);
        expect(Clime.resume.work[0].endYear).to.be.equal(2016);
        expect(Clime.resume.work[0].description).to.be.equal('Lorem ipsum');
    });

    it('should fill volunteer', function () {
        expect(Clime.resume.volunteer).to.have.length.greaterThan(0);
        expect(Clime.resume.volunteer[0].organization).to.be.equal('Science Church');
        expect(Clime.resume.volunteer[0].position).to.be.equal('Evangelist');
        expect(Clime.resume.volunteer[0].startMonth).to.be.equal(2);
        expect(Clime.resume.volunteer[0].startYear).to.be.equal(2015);
        expect(Clime.resume.volunteer[0].endMonth).to.be.equal(2);
        expect(Clime.resume.volunteer[0].endYear).to.be.equal(2015);
        expect(Clime.resume.volunteer[0].description).to.be.equal('Fake volunteer entry');
    });

    it('should fill award', function () {
        expect(Clime.resume.award).to.have.length.greaterThan(0);
        expect(Clime.resume.award[0].title).to.be.equal('Latin-America First Prize on Innovation');
        expect(Clime.resume.award[0].description).to.be.equal('N/A');
        expect(Clime.resume.award[0].awarder).to.be.equal('http://www.cii.uy');
        expect(Clime.resume.award[0].year).to.be.equal(2016);
    });

    it('should fill publication', function () {
        expect(Clime.resume.publication).to.have.length.greaterThan(0);
        expect(Clime.resume.publication[0].name).to.be.equal('Use of singular names in weird open source code');
        expect(Clime.resume.publication[0].description).to.be.equal('Nothing to say');
        expect(Clime.resume.publication[0].publisher).to.be.equal('No1');
        expect(Clime.resume.publication[0].releaseYear).to.be.equal(2018);
        expect(Clime.resume.publication[0].url).to.be.equal('http://agurodriguez.net');
    });

    it('should fill skill', function () {
        expect(Clime.resume.skill).to.have.length.greaterThan(0);
        expect(Clime.resume.skill[0].name).to.be.equal('TypeScript');
        expect(Clime.resume.skill[0].level).to.be.equal('beginner');
        expect(Clime.resume.skill[0].keywords).to.be.equal('typescript, javascript, programming');
    });

    it('should fill language', function () {
        expect(Clime.resume.language).to.have.length.greaterThan(1);
        expect(Clime.resume.language[0].name).to.be.equal('Español');
        expect(Clime.resume.language[0].level).to.be.equal('Native');
        expect(Clime.resume.language[1].name).to.be.equal('English');
        expect(Clime.resume.language[1].level).to.be.equal('Intermediate');
    });

});