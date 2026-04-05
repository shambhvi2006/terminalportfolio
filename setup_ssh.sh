#!/bin/bash

# Terminal Portfolio SSH Server Setup Script

echo "================================"
echo "Terminal Portfolio SSH Setup"
echo "================================"

# Check Python 3
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    exit 1
fi

echo "✓ Python 3 found: $(python3 --version)"

# Check/Install paramiko
echo "Checking for paramiko..."
python3 -c "import paramiko" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "Installing paramiko..."
    pip3 install paramiko
else
    echo "✓ paramiko is already installed"
fi

echo ""
echo "================================"
echo "SSH Server Ready!"
echo "================================"
echo ""
echo "To start the SSH server, run:"
echo "  python3 ssh_server.py"
echo ""
echo "To connect via SSH, use:"
echo "  ssh -p 2222 user@localhost"
echo ""
echo "Or with a remote server:"
echo "  ssh -p 2222 user@your-server-ip"
echo ""
