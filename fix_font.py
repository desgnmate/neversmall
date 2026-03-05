from fontTools.ttLib import TTFont
import sys

def fix_font(input_path, output_path):
    f = TTFont(input_path)
    for table in f['cmap'].tables:
        if hasattr(table, 'language'):
            table.language = 0
    f.save(output_path)
    print("Fixed font saved to", output_path)

if __name__ == "__main__":
    fix_font("e:/!! DEV WORKS !!/neversmall/public/fonts/OCR-A.ttf", "e:/!! DEV WORKS !!/neversmall/public/fonts/OCR-A-fixed.ttf")
