import { ScheduleSectionModule } from './schedule-section.module';

describe('ScheduleSectionModule', () => {
  let scheduleSectionModule: ScheduleSectionModule;

  beforeEach(() => {
    scheduleSectionModule = new ScheduleSectionModule();
  });

  it('should create an instance', () => {
    expect(scheduleSectionModule).toBeTruthy();
  });
});
