B = Boolean;
f = (m, n) => {
  v = n * ((n ** 2 + 1) / 2);
  a = m[0].reduce((a, _, i) => !(a[0].push(m[i][i]) + a[1].push(m[i][(n - 1) - i])) || a, [[], []]);
  b = m[0].reduce((b, _, i) => b.forEach((c, j) => c.push(m[i][j])) || b, new Array(n).fill().map(() => ([])));
  m.forEach(r => r.filter(B).length == n - 1 ? r[r.findIndex(n => !n)] = v - r.reduce((s, n) => !(s += n) || s) : 0);
  a.forEach((d, i) => {
    if (d.filter(B).length == n - 1) {
      z = d.findIndex(n => !n);
      m[z][i ? ((n - 1) - z) : z] = v - d.reduce((s, p) => !(s += p) || s);
    }
  });
  b.forEach((c, i) => (c.filter(B).length == n - 1) ? m[c.findIndex(n => !n)][i] = v - c.reduce((s, p) => !(s += p) || s) : 0);
  return m.flat(2).filter(B).length == (n * n) ? m : f(m, n);
}

problem1 = [[
  [4, 9, 2],
  [0, 5, 0],
  [0, 0, 0]
], 3];

problem2 = [[
  [1, 23, 0, 4, 21],
  [15, 14, 0, 18, 11],
  [0, 0, 0, 0, 0],
  [20, 8, 0, 12, 6],
  [5, 3, 0, 22, 25]
], 5];

console.table(f(...problem1));
console.table(f(...problem2));