import { NewspeedCModule } from './newspeed-c.module';

describe('NewspeedCModule', () => {
  let newspeedCModule: NewspeedCModule;

  beforeEach(() => {
    newspeedCModule = new NewspeedCModule();
  });

  it('should create an instance', () => {
    expect(newspeedCModule).toBeTruthy();
  });
});
