---
title: "Equation Numbering Test"
subtitle: "A test document exercising automatic equation numbering, cross-referencing, hover previews, and footnotes in a MathJax v4 rendering pipeline."
date: "2026-05-24"
modified: "2026-05-24"
topics: ["mathematics", "testing"]
description: "A test document for equation numbering, cross-referencing, backlinks, hover previews, and footnotes using markdown-it and MathJax v4."
publish: true
---

This document exists to test automatic equation numbering and cross-referencing.
It is deliberately written to look like a real technical post so that spacing,
font inheritance, and reference links can all be eyeballed at once. Read it once
in your published pipeline (MathJax v4) and once in Obsidian, and compare.

## Numbered equations and backward references

We begin with a quantity that everything else will refer back to. The free
energy[^free_energy_note] of the system is defined as

[^free_energy_note]: This is the _Helmholtz_ free energy defined through $H =
U_\mathbf{k} - \sum_s T_s S_{s\mathbf{k}}$, where $U$ is the 'fluctuation energy'
(i.e. internal energy associated with the fluctuations), $T_s$ is the temperature
of species $s$ and $S_{s\mathbf{k}}$ is the spectral entropy of species $s$.

$$
\begin{equation}
W = \frac{1}{2} \sum_{\mathbf{k}} \left| \delta f_{\mathbf{k}} \right|^2
\label{eq:free-energy}
\end{equation}
$$

This should render as equation (1). Nothing references it yet, but it will be
referenced later, so the label must survive until the end of the document.

Next, a second numbered equation. The nonlinear transfer function is written

$$
\begin{equation}
T_{\mathbf{k}} = \mathrm{Re} \sum_{\mathbf{p}+\mathbf{q}=\mathbf{k}}
M_{\mathbf{k},\mathbf{p},\mathbf{q}} \, \phi_{\mathbf{p}} \, \phi_{\mathbf{q}}
\label{eq:transfer}
\end{equation}
$$

That should be equation (2). Now a sentence that refers backward: the free
energy defined in \eqref{eq:free-energy} is conserved by the nonlinear term
\eqref{eq:transfer} when summed over all wavenumbers. Both of those references
should be clickable and should read as "(1)" and "(2)" in the body font.

## Forward references and an unnumbered equation

A forward reference is the harder case, because the target has not yet been
assigned a number when the reference is encountered. The closure relation
\eqref{eq:closure} below is the one we will need in the next section — that
reference points at an equation that has not appeared yet.

Before we get there, here is a *displayed but unnumbered* equation. It uses a
plain environment, so it must not consume a number:

$$
\delta f_{\mathbf{k}} = g_{\mathbf{k}} + \frac{q \, \phi_{\mathbf{k}}}{T} F_0
$$

If numbering is working correctly, the equation immediately after this one is
still (3) and not (4) — the unnumbered line above is skipped by the counter.

The closure relation is

$$
\begin{equation}
\delta B_{\parallel, \mathbf{k}} = -\frac{\beta}{2} \, \delta p_{\perp, \mathbf{k}}
\label{eq:closure}
\end{equation}
$$

This should be equation (3). Scroll back up: the forward reference
\eqref{eq:closure} in the previous paragraph should now resolve to "(3)" and
link down to this line.

## Multi-line alignment

Multi-line blocks are where pipelines most often disagree. The following
`align` environment should produce two separately numbered lines, (4) and (5),
each individually referenceable:

$$
\begin{align}
\frac{\partial g_{\mathbf{k}}}{\partial t}
  &= -\, i \omega_{\mathbf{k}} \, g_{\mathbf{k}} + N_{\mathbf{k}} \label{eq:gk-evolution} \\
N_{\mathbf{k}}
  &= \sum_{\mathbf{p}+\mathbf{q}=\mathbf{k}} M_{\mathbf{k},\mathbf{p},\mathbf{q}}
     \, g_{\mathbf{p}} \, \phi_{\mathbf{q}} \label{eq:nonlinear-term}
\end{align}
$$

The linear evolution \eqref{eq:gk-evolution} should be (4) and the nonlinear
term \eqref{eq:nonlinear-term} should be (5).

Finally, an `align` block where one line is deliberately suppressed with
`\nonumber`. Only the second line should take a number, which should be (6):

$$
\begin{align}
\phi_{\mathbf{k}} &= \sum_{s} \frac{q_s}{T_s} \int J_0 \, h_{s,\mathbf{k}} \, d^3v \nonumber \\
\langle T_{\mathbf{k}} \rangle &= \frac{1}{V} \int T_{\mathbf{k}} \, d^3x \label{eq:transfer-avg}
\end{align}
$$

If the counter is correct, the averaged transfer \eqref{eq:transfer-avg} is (6),
which means the whole document contains exactly six numbered equations.

## Reference summary

As a final check, every label is referenced once more here in a single
paragraph so a broken link is easy to spot: free energy \eqref{eq:free-energy},
transfer function \eqref{eq:transfer}, closure \eqref{eq:closure}, linear
evolution \eqref{eq:gk-evolution}, nonlinear term \eqref{eq:nonlinear-term}, and
averaged transfer \eqref{eq:transfer-avg}. Those should read (1) through (6) in
order, all in the body font, all hyperlinked.
