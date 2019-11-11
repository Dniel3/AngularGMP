import { OrderByPipe } from './order-by.pipe';
import { Course } from '../../core/course-model';

describe('OrderByPipe', () => {

  const fakeCourseList: Course[] = [   
    {
      id: 'newest',
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
      id: 'oldest',
      title: 'Accusative',
      creationDate: new Date('Oct 2 2019 13:11:19'),
      duration: 90,
      description: 'Accusative case.',
    },];

  it('create an instance', () => {
    const pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms unsorted curses to sorted ASC', () => {
    const pipe = new OrderByPipe();

    const sortedCourses = pipe.transform(fakeCourseList, 'ASC');

    expect(sortedCourses[0].id).toContain('oldest');
  });

  it('transforms unsorted curses to sorted DESC', () => {
    const pipe = new OrderByPipe();

    const sortedCourses = pipe.transform(fakeCourseList);

    expect(sortedCourses[0].id).toContain('newest');
  });
});
