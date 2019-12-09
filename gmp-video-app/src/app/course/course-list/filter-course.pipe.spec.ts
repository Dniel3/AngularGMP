import { FilterCoursePipe } from './filter-course.pipe';
import { Course } from '../../core/model/course-model';

describe('FilterCoursePipe', () => {

  const fakeCourseList: Course[] = [   
    {
      id: 11,
      name: 'Dative',
      date: new Date().toISOString(),
      length: 120,
      description: 'Dative case.',
      isTopRated: true,
    },
    {
      id: 22,
      name: 'Genitive',
      date: new Date('Oct 25 2019 13:11:19').toISOString(),
      length: 100,
      description: 'Genitive case.',
    },
    {
      id: 33,
      name: 'Accusative',
      date: new Date('Oct 2 2019 13:11:19').toISOString(),
      length: 90,
      description: 'Accusative case.',
    },];

  it('create an instance', () => {
    const pipe = new FilterCoursePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms curses to matching course', () => {
    const pipe = new FilterCoursePipe();

    const filteredCourses = pipe.transform(fakeCourseList, 'genitive');

    expect(filteredCourses.length).toBe(1);
    expect(filteredCourses[0].name).toContain('Genitive');
  });

  it('transforms curses to courses for empty string', () => {
    const pipe = new FilterCoursePipe();

    const filteredCourses = pipe.transform(fakeCourseList);

    expect(filteredCourses.length).toBe(fakeCourseList.length);
  });

  it('transforms curses to empty array for no matching item', () => {
    const pipe = new FilterCoursePipe();

    const filteredCourses = pipe.transform(fakeCourseList, 'foobarfoo');

    expect(filteredCourses.length).toBe(0);
  });
});
