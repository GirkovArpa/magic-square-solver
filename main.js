'use strict';

const solve = (m, n) => {
  const diags = m[0].reduce((diags, _, i) => {
    diags[0].push(m[i][i]);
    diags[1].push(m[i][(n - 1) - i]);
    return diags;
  }, [[], []]);

  const cols = m[0].reduce((cols, _, i) => {
    cols.forEach((col, j) => col.push(m[i][j]));
    return cols;
  }, new Array(n).fill().map(() => ([])));

  const magic = n * ((n ** 2 + 1) / 2);

  m.forEach(row => {
    if (row.filter(Boolean).length == n - 1) {
      const zero = row.findIndex(n => !n);
      const sum = row.reduce((sum, n) => !(sum += n) || sum);
      const dif = magic - sum;
      row[zero] = dif;
    }
  });

  diags.forEach((diag, i) => {
    if (diag.filter(Boolean).length == n - 1) {
      const zero = diag.findIndex(n => !n);
      const sum = diag.reduce((sum, p) => !(sum += p) || sum);
      const dif = magic - sum;
      m[zero][i ? ((n - 1) - zero) : zero] = dif;
    }
  });

  cols.forEach((col, i) => {
    if (col.filter(Boolean).length == n - 1) {
      const zero = col.findIndex(n => !n);
      const sum = col.reduce((sum, p) => !(sum += p) || sum);
      const dif = magic - sum;
      m[zero][i] = dif;
    }
  });

  if (m.flat(2).filter(Boolean).length == (n * n)) {
    return m;
  } else {
    return solve(m, n);
  }
}

const problem1 = [[
  [4, 9, 2],
  [0, 5, 0],
  [0, 0, 0]
], 3];

const problem2 = [[
  [1, 23, 0, 4, 21],
  [15, 14, 0, 18, 11],
  [0, 0, 0, 0, 0],
  [20, 8, 0, 12, 6],
  [5, 3, 0, 22, 25]
], 5];

console.table(solve(...problem1));
console.table(solve(...problem2));