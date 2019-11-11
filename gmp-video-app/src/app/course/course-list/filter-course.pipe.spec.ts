import { FilterCoursePipe } from './filter-course.pipe';
import { Course } from '../../core/course-model';

describe('FilterCoursePipe', () => {

  const fakeCourseList: Course[] = [   
    {
      id: '11',
      title: 'Dative',
      creationDate: new Date(),
      duration: 120,
      description: 'Dative case.',
      topRated: true,
    },
    {
      id: '22',
      title: 'Genitive',
      creationDate: new Date('Oct 25 2019 13:11:19'),
      duration: 100,
      description: 'Genitive case.',
    },
    {
      id: '33',
      title: 'Accusative',
      creationDate: new Date('Oct 2 2019 13:11:19'),
      duration: 90,
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
    expect(filteredCourses[0].title).toContain('Genitive');
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
