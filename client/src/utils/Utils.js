import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
    // Tailwind config
    return resolveConfig('./src/css/tailwind.config.js');
};

export const hexToRGB = (h) => {
    let r = 0;
    let g = 0;
    let b = 0;
    if (h.length === 4) {
        r = `0x${h[1]}${h[1]}`;
        g = `0x${h[2]}${h[2]}`;
        b = `0x${h[3]}${h[3]}`;
    } else if (h.length === 7) {
        r = `0x${h[1]}${h[2]}`;
        g = `0x${h[3]}${h[4]}`;
        b = `0x${h[5]}${h[6]}`;
    }
    return `${+r},${+g},${+b}`;
};

export const formatValue = (value) =>
    Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumSignificantDigits: 3,
        notation: 'compact',
    }).format(value);

export const mapOrder = (array, order, key) => {
    if (!array || !order || !key) return [];
    array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
    return array;
};

export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
};

export const toggle = (collection, item) => {
    var idx = collection.indexOf(item);
    if (idx !== -1) {
      collection.splice(idx, 1);
    } else {
      collection.push(item);
    }
  }