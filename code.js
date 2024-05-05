// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//console.log(returnRandBase());
// console.log(mockUpStrand());

//pAequorFactory function returns  a new object. specimenNum defines which the object number
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      let mutatedDNA = this.dna.slice(); //It's necessary to create a copy of the array within the method, otherwise the property won't be changed.
      let randomIndex = Math.floor(Math.random() * 15);
      let originalBase = mutatedDNA[randomIndex];
      let newBase = returnRandBase();
      while (newBase === originalBase) {
        newBase = returnRandBase();
      }
      mutatedDNA[randomIndex] = newBase;
      return mutatedDNA;
      // the while loop makes sure the base is not the same
    },
    // the comparedDNA method compares two objects, and takes one as argument.
    comparedDNA(otherAequor) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherAequor.dna[i]) {
          identicalBases++;
        }
      }
      let percentage = (identicalBases / this.dna.length) * 100;
      console.log(`Specimen #${this.specimenNum} and specimen #${otherAequor.specimenNum} have ${percentage}% DNA in common.`)
    },
    // willLikelySurvive method returns true if the percentage is more than 60% in common. Otherwise, it returns false. The base must be either C or G.
    willLikelySurvive() {
      let survivalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          survivalBases++;
        }
      }
      let survivalPercentage = (survivalBases / this.dna.length) * 100;
      // console.log(survivalPercentage); //check the %
      if (survivalPercentage > 60) { 
        return true
      } else {
        return false
      }
    }
  };
};

// Testing ground
const pAequor1 = pAequorFactory(1, mockUpStrand()); // Creates object 1 for testing
const pAequor2 = pAequorFactory(2, mockUpStrand()); // Creates object 2 for testing

// console.log(pAequorFactory(1,mockUpStrand()));
// pAequor1.comparedDNA(pAequor2);
// const mutatedPaequor = pAequor.mutate();
// console.log(mutatedPaequor);
// console.log(pAequor.dna);
// console.log(pAequor1);
//console.log(pAequor2.willLikelySurvive());

// This fuction creates 30 objects and test each of them, adding the objects likely to survive to a new array.
const testObjects = () => {
  const pAequorObjects = [];
  const aliveObjects = [];
  for (let i = 1; i <= 30; i++) {
    const newSpecimen = pAequorFactory(i, mockUpStrand());
    pAequorObjects.push(newSpecimen);
  }
  // return pAequorObjects; // I realized a function cannot have two returns
  for (let i = 0; i < pAequorObjects.length; i++) {
    if (pAequorObjects[i].willLikelySurvive()) {
      aliveObjects.push(pAequorObjects[i]);
    }
  }
  return aliveObjects;
};

console.log(testObjects());
