import { OrderByPipe } from './order-by.pipe';
import { Course } from '../../core/model/course-model';

describe('OrderByPipe', () => {

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
    const pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms unsorted curses to sorted ASC', () => {
    const pipe = new OrderByPipe();

    const sortedCourses = pipe.transform(fakeCourseList, 'ASC');

    expect(sortedCourses[0].id).toBe(33);
  });

  it('transforms unsorted curses to sorted DESC', () => {
    const pipe = new OrderByPipe();

    const sortedCourses = pipe.transform(fakeCourseList);

    expect(sortedCourses[0].id).toBe(11);
  });
});
