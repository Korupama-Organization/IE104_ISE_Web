#!/usr/bin/env python3
"""
Script để thêm prefix /ISE_Web/ vào tất cả internal links trong HTML files
"""
import os
import re
from pathlib import Path

def fix_internal_links(file_path, repo_prefix="/ISE_Web"):
    """Fix internal links trong HTML file"""
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Patterns cần fix - chỉ fix href và action, không fix src (assets đã có prefix)
        patterns = [
            # href="/dao-tao" → href="/ISE_Web/dao-tao"
            (r'href=(["\'])/(dao-tao|lien-he|gioi-thieu|home|cac-nhom-nghien-cuu|cong-bo-khoa-hoc|bai-bao-nckh-sinh-vien|tin-tuc|nhom-nghien-cuu|giang-vien|doi-ngu-nhan-su)', 
             rf'href=\1{repo_prefix}/\2'),
            
            # href="/" → href="/ISE_Web/"
            (r'href=(["\'])/(["\'])', rf'href=\1{repo_prefix}/\2'),
            
            # action="/path" → action="/ISE_Web/path"  
            (r'action=(["\'])/([\w\-]+)', rf'action=\1{repo_prefix}/\2'),
        ]
        
        # Apply tất cả patterns
        changes_made = False
        for pattern, replacement in patterns:
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                changes_made = True
                content = new_content
        
        # Chỉ ghi nếu có thay đổi
        if changes_made and content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated {file_path}")
            return True
        else:
            print(f"⏭️  Skip {file_path} (no changes needed)")
            return False
        
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Main function"""
    root_dir = Path(__file__).parent
    
    print(f"🔍 Searching for HTML files...")
    print(f"📝 Adding /ISE_Web prefix to internal links...\n")
    
    # Tìm tất cả HTML files (bao gồm cả components)
    html_files = []
    for pattern in ["pages/**/*.html", "components/*.html"]:
        html_files.extend(root_dir.glob(pattern))
    
    if not html_files:
        print("⚠️  No HTML files found!")
        return
    
    updated_count = 0
    for html_file in html_files:
        if fix_internal_links(html_file):
            updated_count += 1
    
    print(f"\n✨ Done! Updated {updated_count}/{len(html_files)} files")

if __name__ == "__main__":
    main()
