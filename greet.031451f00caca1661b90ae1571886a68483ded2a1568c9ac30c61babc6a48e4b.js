var newGreeter = function (greetElemParam, caretElemParam, greetingsParam, loopParam) {
  if (greetings.length == 0) throw "Greetings must be non-empty";
  for (let greet in greetings) {
    if (greet.length == 0) throw "Each greeting must be non-empty";
  }
  greeter = {
      greetElem:    greetElemParam,
      caretElem:    caretElemParam,
      greetings:    greetingsParam,
      restGreets:   greetingsParam.slice(1),
      currGreet:    greetingsParam[0],
      phase:        true,
      loop:         loopParam,
      longTimeout:  4750,
      shortTimeout: 250,
      lastTimeout:  1.5 * 1000 * 5,
      nextGreet:  function () {
        const me = this;
        var nextPhase = this.phase;
        var done = false;

        // addition phase
        if (this.phase) {
          var idx = this.greetElem.textContent.length;
          if (idx < this.currGreet.length) this.greetElem.textContent += this.currGreet[idx];
          nextPhase = !(idx == this.currGreet.length);
        // deletion phase
        } else {
          this.greetElem.textContent = this.greetElem.textContent.slice(0,-1);
          nextPhase = this.greetElem.textContent == 0;
        }

        const endOfAddPhase = this.phase && ! nextPhase;
        this.phase = nextPhase;

        // select next greeting if available at end of addition phase
        if (endOfAddPhase) {
          // loop if needed
          if (this.restGreets.length == 0 && this.loop) this.restGreets = this.greetings;
          // select next greeting if not done
          done = this.restGreets.length == 0;
          if (! done) {
            this.currGreet  = this.restGreets[0];
            this.restGreets = this.restGreets.slice(1);
          }
        }

        if (! done) {
          setTimeout(function () {me.nextGreet()}, endOfAddPhase ? this.longTimeout : this.shortTimeout);
        } else {
          setTimeout(function () {me.finish()}, this.lastTimeout);
        }
        if (endOfAddPhase) { this.caretElem.style.animationName = "blinker"; }
        else               { this.caretElem.style.animationName = "none"; }
      },
      finish: function () {
        this.caretElem.style.display = "none";
      }
    };
  return greeter;
}
