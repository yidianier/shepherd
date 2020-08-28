import ShepherdModal from '../../../src/js/components/shepherd-modal.svelte';
import { stub } from 'sinon';

const classPrefix = '';

describe('components/ShepherdModal', () => {
  describe('closeModalOpening()', function() {
    it('sets values back to 0', async() => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
          {
            classPrefix
          }
      });

      await modalComponent.positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      }, null);

      let modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM20,20a0,0,0,0,0-0,0V270a0,0,0,0,0,0,0H520a0,0,0,0,0,0-0V20a0,0,0,0,0-0-0Z');

      await modalComponent.closeModalOpening();

      modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z');

      modalComponent.$destroy();
    });
  });

  describe('positionModalOpening()', function() {
    it('sets the correct attributes when positioning modal opening', async() => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
          {
            classPrefix
          }
      });

      let modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z');

      await modalComponent.closeModalOpening();

      modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z');

      await modalComponent.positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      }, null);

      modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM20,20a0,0,0,0,0-0,0V270a0,0,0,0,0,0,0H520a0,0,0,0,0,0-0V20a0,0,0,0,0-0-0Z');

      modalComponent.$destroy();
    });

    it('sets the correct attributes with padding', async() => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
          {
            classPrefix
          }
      });

      let modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z');

      await modalComponent.positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      }, null, 10);

      modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM10,10a0,0,0,0,0-0,0V280a0,0,0,0,0,0,0H530a0,0,0,0,0,0-0V10a0,0,0,0,0-0-0Z');

      modalComponent.$destroy();
    });

    it('sets the correct attributes when positioning modal opening with border radius', async() => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
            {
              classPrefix
            }
      });

      let modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z');

      await modalComponent.closeModalOpening();

      modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z');

      await modalComponent.positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      }, null, 0, 10);

      modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM30,20a10,10,0,0,0-10,10V260a10,10,0,0,0,10,10H510a10,10,0,0,0,10-10V30a10,10,0,0,0-10-10Z');

      modalComponent.$destroy();
    });

    it('sets the correct attributes when target is overflowing from scroll parent', async() => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props: {
          classPrefix
        }
      });

      await modalComponent.positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 500,
            x: 10,
            y: 10,
            width: 500
          };
        }
      }, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 10,
            y: 100,
            width: 500
          };
        }
      }, 0);

      const modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM10,100a0,0,0,0,0-0,0V350a0,0,0,0,0,0,0H510a0,0,0,0,0,0-0V100a0,0,0,0,0-0-0Z');

      modalComponent.$destroy();
    });

    it('sets the correct attributes when target fits inside scroll parent', async() => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props: {
          classPrefix
        }
      });

      await modalComponent.positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 250,
            x: 10,
            y: 100,
            width: 500
          };
        }
      }, {
        getBoundingClientRect() {
          return {
            height: 500,
            x: 10,
            y: 10,
            width: 500
          };
        }
      }, 0);

      const modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute('d', 'M1024,768H0V0H1024V768ZM10,100a0,0,0,0,0-0,0V350a0,0,0,0,0,0,0H510a0,0,0,0,0,0-0V100a0,0,0,0,0-0-0Z');

      modalComponent.$destroy();
    });
  });

  describe('setupForStep()', function() {
    let hideStub, showStub;

    afterEach(() => {
      hideStub.restore();
      showStub.restore();
    });

    it.skip('useModalOverlay: false, hides modal', async() => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
                    {
                      classPrefix
                    }
      });

      const step = {
        options: {},
        tour: {
          options: {
            useModalOverlay: false
          }
        }
      };
      hideStub = stub(modalComponent, 'hide');
      showStub = stub(modalComponent, 'show');
      await modalComponent.setupForStep(step);

      expect(hideStub.called).toBe(true);
      expect(showStub.called).toBe(false);

      modalComponent.$destroy();
    });

    it.skip('useModalOverlay: true, shows modal', async() => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
                    {
                      classPrefix
                    }
      });

      const step = {
        options: {},
        tour: {
          options: {
            useModalOverlay: true
          }
        }
      };
      hideStub = stub(modalComponent, 'hide');
      showStub = stub(modalComponent, 'show');
      await modalComponent.setupForStep(step);

      expect(hideStub.called).toBe(false);
      expect(showStub.called).toBe(true);

      modalComponent.$destroy();
    });
  });

  describe('show/hide', function() {
    const modalComponent = new ShepherdModal({
      target: document.body,
      props:
        {
          classPrefix
        }
    });

    it('show adds classes', async() => {
      await modalComponent.show();

      expect(modalComponent.getElement()).toHaveClass('shepherd-modal-is-visible');
    });

    it('hide removes classes', async() => {
      await modalComponent.hide();

      expect(modalComponent.getElement()).not.toHaveClass('shepherd-modal-is-visible');

      modalComponent.$destroy();
    });
  });
});
