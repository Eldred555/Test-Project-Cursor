"""3×3 ●×ゲーム: 先行=プレイヤー(●)、後攻=コンピューター(×)"""

from __future__ import annotations

import random


PLAYER = "●"
COMPUTER = "×"
EMPTY = " "


def new_board() -> list[str]:
    return [EMPTY] * 9


def print_board(board: list[str]) -> None:
    print()
    for row in range(3):
        cells = [board[row * 3 + col] for col in range(3)]
        print(f" {cells[0]} | {cells[1]} | {cells[2]} ")
        if row < 2:
            print("---+---+---")
    print()


def print_guide() -> None:
    print("マス番号:")
    print(" 1 | 2 | 3 ")
    print("---+---+---")
    print(" 4 | 5 | 6 ")
    print("---+---+---")
    print(" 7 | 8 | 9 ")


def winner(board: list[str]) -> str | None:
    lines = (
        (0, 1, 2),
        (3, 4, 5),
        (6, 7, 8),
        (0, 3, 6),
        (1, 4, 7),
        (2, 5, 8),
        (0, 4, 8),
        (2, 4, 6),
    )
    for a, b, c in lines:
        if board[a] != EMPTY and board[a] == board[b] == board[c]:
            return board[a]
    return None


def is_draw(board: list[str]) -> bool:
    return EMPTY not in board and winner(board) is None


def available_moves(board: list[str]) -> list[int]:
    return [i for i, cell in enumerate(board) if cell == EMPTY]


def player_move(board: list[str]) -> None:
    while True:
        raw = input("あなたの手（1-9）: ").strip()
        if not raw.isdigit():
            print("数字の 1〜9 を入力してください。")
            continue
        pos = int(raw)
        if pos < 1 or pos > 9:
            print("1〜9 の番号を入力してください。")
            continue
        idx = pos - 1
        if board[idx] != EMPTY:
            print("そのマスはすでに埋まっています。")
            continue
        board[idx] = PLAYER
        return


def computer_move(board: list[str]) -> None:
    moves = available_moves(board)

    # 1) 勝てる手があれば取る
    for idx in moves:
        board[idx] = COMPUTER
        if winner(board) == COMPUTER:
            return
        board[idx] = EMPTY

    # 2) プレイヤーの勝ちを止める
    for idx in moves:
        board[idx] = PLAYER
        if winner(board) == PLAYER:
            board[idx] = COMPUTER
            return
        board[idx] = EMPTY

    # 3) 中央 → 角 → 辺の優先
    for preferred in (4, 0, 2, 6, 8, 1, 3, 5, 7):
        if preferred in moves:
            board[preferred] = COMPUTER
            return

    board[random.choice(moves)] = COMPUTER


def play() -> None:
    board = new_board()
    print("=== ●×ゲーム (3×3) ===")
    print(f"あなた: {PLAYER}（先行） / コンピューター: {COMPUTER}（後攻）")
    print_guide()

    while True:
        print_board(board)
        player_move(board)

        if winner(board) == PLAYER:
            print_board(board)
            print("あなたの勝ちです！")
            return
        if is_draw(board):
            print_board(board)
            print("引き分けです。")
            return

        computer_move(board)
        print("コンピューターが打ちました。")

        if winner(board) == COMPUTER:
            print_board(board)
            print("コンピューターの勝ちです。")
            return
        if is_draw(board):
            print_board(board)
            print("引き分けです。")
            return


def main() -> None:
    while True:
        play()
        again = input("もう一度プレイしますか？ (y/n): ").strip().lower()
        if again not in ("y", "yes", "ｙ"):
            print("ありがとうございました。")
            break


if __name__ == "__main__":
    main()
