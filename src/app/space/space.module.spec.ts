import { SpaceModule } from './space.module';

describe('SpaceModule', () => {
  let spaceModule: SpaceModule;

  beforeEach(() => {
    spaceModule = new SpaceModule();
  });

  it('should create an instance', () => {
    expect(spaceModule).toBeTruthy();
  });
});
