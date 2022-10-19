import os
import signal
import sys


def main():
    from supervisor.childutils import listener

    # transition from ACKNOWLEDGED to READY &
    # read header line and event payload
    headers, payload = listener.wait()

    # transition from READY to ACKNOWLEDGED
    listener.ok()

    # terminate main process
    os.kill(1, signal.SIGTERM)


if __name__ == '__main__':
    main()
