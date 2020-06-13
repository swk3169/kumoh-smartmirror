import { WriteModule } from './write.module';

describe('WriteModule', () => {
  let writeModule: WriteModule;

  beforeEach(() => {
    writeModule = new WriteModule();
  });

  it('should create an instance', () => {
    expect(writeModule).toBeTruthy();
  });
});
