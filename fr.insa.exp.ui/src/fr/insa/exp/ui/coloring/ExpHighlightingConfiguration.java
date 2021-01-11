package fr.insa.exp.ui.coloring;

import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.RGB;
import org.eclipse.xtext.ui.editor.syntaxcoloring.DefaultHighlightingConfiguration;
import org.eclipse.xtext.ui.editor.utils.TextStyle;

public class ExpHighlightingConfiguration extends DefaultHighlightingConfiguration {
	public TextStyle keywordTextStyle() {
		TextStyle textStyle = new TextStyle();
		textStyle.setColor(new RGB(120, 50, 240));
		textStyle.setStyle(SWT.BOLD);
		return textStyle;
	}
}
