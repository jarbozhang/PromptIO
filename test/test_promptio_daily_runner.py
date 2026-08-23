import importlib.util
import unittest
from pathlib import Path
from unittest.mock import patch

RUNNER_PATH = Path.home() / '.hermes' / 'scripts' / 'promptio_daily_runner.py'


def load_runner():
    spec = importlib.util.spec_from_file_location('promptio_daily_runner', RUNNER_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class PromptIODailyRunnerTests(unittest.TestCase):
    def test_generate_one_extends_inner_codex_timeout_to_match_recovery_budget(self):
        runner = load_runner()
        topic = {'title': 'test', 'file': 'sources/test.md'}
        with patch.object(runner, 'run') as mocked_run:
            runner.generate_one(topic, timeout=1200)
        env = mocked_run.call_args.kwargs['env']
        self.assertEqual(env['CODEX_TIMEOUT_MS'], '900000')

    def test_sopilot_zero_of_zero_is_a_hard_failure(self):
        runner = load_runner()
        with self.assertRaisesRegex(RuntimeError, 'SoPilot fetch degraded'):
            runner.validate_sopilot_output('SoPilot: saved 0/0 hot tweets (0 failures)')

    def test_sopilot_nonempty_summary_is_accepted(self):
        runner = load_runner()
        self.assertEqual(
            runner.validate_sopilot_output('SoPilot: saved 17/17 hot tweets (0 failures)'),
            {'saved': 17, 'seen': 17, 'failed': 0},
        )


if __name__ == '__main__':
    unittest.main()
