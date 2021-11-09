import './polyfills';
import '../scss/app.scss';

class DownloadAssetsPlugin {
  constructor() {
    // Set Variables

    // Functions
    this.onMatrixBlockAddButtonClick = this.matrixBlockAddButtonClick.bind(this);
    this.onAjaxComplete = this.ajaxComplete.bind(this);
    this.onElementSelectAddButtonClick = this.elementSelectAddButtonClick.bind(this);
    this.onElementSelected = this.elementSelected.bind(this);

    this.init();
  }

  init() {
    this.addEvents();
    this.render();
  }

  addEvents() {
    // Add event handlers
    Garnish.$doc
      .on('click', '.matrix .btn.add, .matrix .btn[data-type]', this.onMatrixBlockAddButtonClick)
      .on('click', '.field .input .elementselect .btn.add', this.onElementSelectAddButtonClick)
      .ajaxComplete(this.onAjaxComplete);
  }

  rebindAssetEvents() {
    Garnish.$doc.off('click', '.field .input .elementselect .btn.add', this.onElementSelectAddButtonClick);
    Garnish.$doc.on('click', '.field .input .elementselect .btn.add', this.onElementSelectAddButtonClick);
  }

  elementSelectAddButtonClick() {
    setTimeout(() => {
      if (Garnish.Modal.visibleModal) {
        const submit = Garnish.Modal.visibleModal.$container[0].querySelector('.modal.elementselectormodal .btn.submit');
        const elements = Garnish.Modal.visibleModal.$container[0].querySelector('.modal.elementselectormodal .elements');
        if (submit) {
          submit.removeEventListener('click', this.onElementSelected);
          submit.addEventListener('click', this.onElementSelected);
        }
        if (elements) {
          elements.removeEventListener('dblclick', this.onElementSelected);
          elements.addEventListener('dblclick', this.onElementSelected);
        }
      }
    }, 1000);
  }

  elementSelected() {
    setTimeout(() => {
      this.render();
    }, 1000);
  }

  matrixBlockAddButtonClick() {
    Garnish.requestAnimationFrame(() => {
      this.rebindAssetEvents();
      this.render();
    });
  }

  ajaxComplete() {
    this.render();
  }

  render() {
    const elementSelectFields = document.querySelectorAll('.field .input .elementselect .element:not(.linked)');
    const assetFields = [...elementSelectFields].filter(field => field.dataset.type === 'craft\\elements\\Asset');

    assetFields.forEach((field) => {
      const a = document.createElement('a');
      const label = field.querySelector('.label');
      if (field && label) {
        a.classList.add('download');
        a.classList.add('icon');
        field.insertBefore(a, label);
        field.classList.add('linked');

        a.addEventListener('click', (event) => {
          event.preventDefault();

          const [f] = Craft.createForm();
          const form = document.body.appendChild(f);
          form.innerHTML = Craft.getCsrfInput();
          const action = document.createElement('input');
          action.name = 'action';
          action.type = 'hidden';
          action.value = 'assets/download-asset';
          const assetId = document.createElement('input');
          assetId.name = 'assetId';
          assetId.type = 'hidden';
          assetId.value = field.dataset.id;
          const submit = document.createElement('input');
          submit.type = 'submit';
          submit.value = 'Submit';
          form.appendChild(action);
          form.appendChild(assetId);
          form.appendChild(submit);
          form.submit();
          document.body.removeChild(form);
        });
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new DownloadAssetsPlugin();
});
