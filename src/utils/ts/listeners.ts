
export class Swipe {
    xDown: number;
    yDown: number;
    xDiff: number;
    yDiff: number;
    element: any;
    isChanged: boolean;

    cLeft: any;
    cRight: any;
    cUp: any;
    cDown: any;
    cDiff: any;
    cToucheStart: any;
    cToucheEnd: any;
    callback: any;

    constructor(element) {
      this.xDown = null;
      this.yDown = null;
      this.element =
        typeof element === 'string' ? document.querySelector(element) : element;

      this.element.addEventListener(
        'touchstart',
        evt => {
          console.log('touchstart');
          this.xDown = evt.touches[0].clientX;
          this.yDown = evt.touches[0].clientY;
          this.xDiff = 0;
          this.yDiff = 0;
          this.cToucheStart();
        },
        false
      );
    }

    onLeft(callback) {
      this.cLeft = callback;
      return this;
    }

    onRight(callback) {
      this.cRight = callback;
      return this;
    }

    onUp(callback) {
      this.cUp = callback;
      return this;
    }

    onDown(callback) {
      this.cDown = callback;
      return this;
    }

    onDiff(callback) {
      this.cDiff = callback;
      return this;
    }
    onToucheStart(callback) {
      this.cToucheStart = callback;
      return this;
    }
    onToucheEnd(callback) {
      this.cToucheEnd = callback;
      return this;
    }

    diffReset() {
      this.xDown = null;
      this.yDown = null;
    }

    handleTouchMove(evt) {
      if (!this.xDown || !this.yDown) {
        return;
      }
      this.isChanged = false;

      const xUp = evt.touches[0].clientX;
      const yUp = evt.touches[0].clientY;

      this.xDiff = this.xDown - xUp;
      this.yDiff = this.yDown - yUp;
      // console.log(this.xDiff, window.innerWidth, 'test');
      this.cDiff();
      if (!this.isChanged && Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
        // Most significant.
        if (this.xDiff > window.innerWidth * 0.2) {
          this.isChanged = true;
          this.cLeft();
          this.diffReset();
        } else if (this.xDiff < window.innerWidth * -0.2) {
          this.isChanged = true;
          this.cRight();
          this.diffReset();
        }
      } else {
        if (this.yDiff > window.innerHeight * 0.2) {
          this.isChanged = true;
          this.cUp();
          this.diffReset();
        } else if (this.yDiff < window.innerHeight * -0.2) {
          this.isChanged = true;
          this.cDown();
          this.diffReset();
        }
      }
      // Reset values.
      // this.xDown = null;
      // this.yDown = null;
    }

    run() {
      this.element.addEventListener(
        'touchmove',
        evt => {
          this.handleTouchMove(evt);
        },
        false
      );
      this.element.addEventListener(
        'touchend',
        evt => {
          this.cToucheEnd();
        },
        false
      );
    }
}