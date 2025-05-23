const traceData = {
  create: {
    steps: (values) => [
      "Parse the input string into an array of numbers.",
      "Create a new array with the parsed values.",
      `Set the array to: [${values.join(", ")}].`
    ],
    timeComplexity: "O(n) because creating an array of n elements takes linear time."
  },
  insert: {
    steps: (value, index, arrayLength) => {
      const steps = [
        `Validate the index: ${index} must be between 0 and ${arrayLength}.`,
        "Increase the array size by 1."
      ];
      // Add steps for shifting elements (granular: one step per shift)
      for (let i = arrayLength - 1; i >= index; i--) {
        steps.push(`Shift element at index ${i} to index ${i + 1}.`);
      }
      steps.push(`Insert the value ${value} at index ${index}.`);
      return steps;
    },
    timeComplexity: "O(n) because shifting elements takes linear time."
  },
  delete: {
    steps: (index, arrayLength) => {
      const steps = [
        `Validate the index: ${index} must be between 0 and ${arrayLength - 1}.`
      ];
      // Add steps for shifting elements (granular: one step per shift)
      for (let i = index; i < arrayLength - 1; i++) {
        steps.push(`Shift element at index ${i + 1} to index ${i}.`);
      }
      steps.push("Decrease the array size by 1.");
      return steps;
    },
    timeComplexity: "O(n) because shifting elements takes linear time."
  },
  search: {
    steps: (value) => [
      `Search for the value ${value} in the array.`,
      "Iterate through each element to find a match.",
      "Return the index if found, or indicate not found."
    ],
    timeComplexity: "O(n) because linear search takes linear time."
  },
  update: {
    steps: (value, index, arrayLength) => [
      `Validate the index: ${index} must be between 0 and ${arrayLength - 1}.`,
      `Update the element at index ${index} to value ${value}.`
    ],
    timeComplexity: "O(1) because updating an element by index takes constant time."
  }
};

export default traceData;